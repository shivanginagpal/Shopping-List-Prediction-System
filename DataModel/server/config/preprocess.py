import numpy as np
import pandas as pd
import math


def userPreprocessing(file1, file2, file3):
    test_user_prior = pd.read_csv(file1, dtype={
        'order_id': np.int32,
        'product_id': np.uint16,
        'add_to_cart_order': np.int16,
        'reordered': np.int8})

    test_order = pd.read_csv(file2, dtype={
        'order_id': np.int32,
        'user_id': np.int32,
        'eval_set': 'category',
        'order_number': np.int16,
        'order_dow': np.int8,
        'order_hour_of_day': np.int8,
        'days_since_prior_order': np.float32})

    test_products = pd.read_csv(file3, dtype={
        'product_id': np.uint16,
        'order_id': np.int32,
        'aisle_id': np.uint8,
        'department_id': np.uint8},
        usecols=['product_id', 'aisle_id', 'department_id'])

    prods = pd.DataFrame()
    prods['orders'] = test_user_prior.groupby(
        test_user_prior.product_id).size().astype(np.int32)
    prods['reorders'] = test_user_prior['reordered'].groupby(
        test_user_prior.product_id).sum().astype(np.float32)
    prods['reorder_rate'] = (prods.reorders / prods.orders).astype(np.float32)
    test_products = test_products.join(prods, on='product_id')
    test_products.set_index('product_id', drop=False, inplace=True)
    del prods

   # print('adding order details to priors')
    test_order.set_index('order_id', inplace=True, drop=False)
    test_user_prior = test_user_prior.join(
        test_order, on='order_id', rsuffix='_')
    test_user_prior.drop('order_id_', inplace=True, axis=1)

    usr = pd.DataFrame()
    usr['average_days_between_orders'] = test_order.groupby(
        'user_id')['days_since_prior_order'].mean().astype(np.float32)
    usr['nb_orders'] = test_order.groupby(
        'user_id').size().astype(np.int16)  # number of orders
    usr.head()  # for every user we are calculating the average days between the orders

    users = pd.DataFrame()

    users['total_items'] = test_user_prior.groupby(
        'user_id').size().astype(np.int16)
    users['all_products'] = test_user_prior.groupby(
        'user_id')['product_id'].apply(set)
    users['total_distinct_items'] = (
        users.all_products.map(len)).astype(np.int16)
    users['user_max_order_num'] = test_user_prior.groupby(
        'user_id')['order_number'].max().astype(np.int16)
    users['total_buy_max'] = test_user_prior.groupby(['user_id', 'product_id'])['product_id'].count(
    ).reset_index(level='user_id').reset_index(drop=True).groupby('user_id').max().astype(np.int16)

    users = users.join(usr)
    users['average_basket'] = (
        users.total_items / users.nb_orders).astype(np.float32)

    del usr
    test_user_prior['user_product'] = test_user_prior.product_id + \
        test_user_prior.user_id * 100000

    d = dict()  # created temp dict of d and didn the following and now created userXproduct dataframe
    for row in test_user_prior.itertuples():
        z = row.user_product
        if z not in d:
            d[z] = (1,
                    (row.order_number, row.order_id),
                    (row.order_number, row.order_id),
                    row.add_to_cart_order)
        else:
            d[z] = (d[z][0] + 1,  # number of times the product is purchaed by a user
                    # last order_numer when product was ordered
                    max(d[z][1], (row.order_number, row.order_id)),
                    # first order_numer when product was ordered
                    min(d[z][2], (row.order_number, row.order_id)),
                    d[z][3] + row.add_to_cart_order)  # kind of priority of adding the product to cart

    userXproduct = pd.DataFrame.from_dict(d, orient='index')
    del d
    userXproduct.columns = ['nb_orders', 'last_order_id',
                            'first_order_number', 'sum_pos_in_cart']
    userXproduct.nb_orders = userXproduct.nb_orders.astype(np.int16)
    userXproduct.last_order_id = userXproduct.last_order_id.map(
        lambda x: x[1]).astype(np.int32)
    userXproduct.first_order_number = userXproduct.first_order_number.map(
        lambda x: x[0]).astype(np.int16)
    userXproduct.sum_pos_in_cart = userXproduct.sum_pos_in_cart.astype(
        np.int16)
    # Load test Order data
    test_orders = test_order[test_order.eval_set == 'test']

    def features(selected_orders, labels_given=False):
        #print('build candidate list')
        order_list = []
        product_list = []
        labels = []
        i = 0
        # print(selected_orders.head())
        for row in selected_orders.itertuples():
            i += 1
            order_id = row.order_id
            user_id = row.user_id
            user_products = users.all_products[user_id]
            product_list += user_products
            order_list += [order_id] * len(user_products)
            if labels_given:  # if labels is pssed as true
                labels += [(order_id, product)
                           in train.index for product in user_products]

        df = pd.DataFrame(
            {'order_id': order_list, 'product_id': product_list}, dtype=np.int32)
        # if labels_given is false
        labels = np.array(labels, dtype=np.int8)
        del order_list
        del product_list

        print('user related features')
        df['user_id'] = df.order_id.map(test_order.user_id)
        df['user_total_orders'] = df.user_id.map(users.nb_orders)
        df['user_total_items'] = df.user_id.map(users.total_items)
        df['total_distinct_items'] = df.user_id.map(users.total_distinct_items)
        df['user_average_days_between_orders'] = df.user_id.map(
            users.average_days_between_orders)
        df['user_average_basket'] = df.user_id.map(users.average_basket)
        df['user_total_buy_max'] = df.user_id.map(
            users.total_buy_max).astype(np.int16)

        #print('order related features')
        df['order_dow'] = df.order_id.map(test_order.order_dow)
        df['order_hour_of_day'] = df.order_id.map(test_order.order_hour_of_day)
        df['days_since_prior_order'] = df.order_id.map(
            test_order.days_since_prior_order)
        df['days_since_ratio'] = (df.days_since_prior_order / df.user_average_days_between_orders).map(
            lambda x: 0 if math.isnan(x) else x).astype(np.float32)

        #print('product related features')
        df['aisle_id'] = df.product_id.map(test_products.aisle_id)
        df['department_id'] = df.product_id.map(test_products.department_id)
        df['product_orders'] = df.product_id.map(
            test_products.orders).astype(np.int32)
        df['product_reorders'] = df.product_id.map(test_products.reorders)
        df['product_reorder_rate'] = df.product_id.map(
            test_products.reorder_rate).astype(np.float32)

        #print('user_X_product related features')
        df['z'] = df.user_id * 100000 + df.product_id
        df.drop(['user_id'], axis=1, inplace=True)
        df['UP_orders'] = df.z.map(userXproduct.nb_orders)
        df['UP_orders_ratio'] = (
            df.UP_orders / df.user_total_orders).astype(np.float32)
        df['UP_last_order_id'] = df.z.map(userXproduct.last_order_id)
        df['UP_average_pos_in_cart'] = (
            df.z.map(userXproduct.sum_pos_in_cart) / df.UP_orders).astype(np.float32)
        df['UP_reorder_rate'] = (
            (df.UP_orders-1) / (df.user_total_orders-1).astype(np.float32))
        df['UP_orders_since_last'] = df.user_total_orders - \
            df.UP_last_order_id.map(test_order.order_number)
        df['UP_delta_hour_vs_last'] = abs(df.order_hour_of_day - df.UP_last_order_id.map(
            test_order.order_hour_of_day)).map(lambda x: min(x, 24-x)).astype(np.int8)
        df['UP_delta_dow_vs_last'] = abs(df.order_dow - df.UP_last_order_id.map(
            test_order.order_dow)).map(lambda x: min(x, 7-x)).astype(np.int8)
        df['UP_drop_chance'] = (
            df.user_total_orders - df.UP_last_order_id.map(test_order.order_number)).astype(np.float)
        df['UP_chance_vs_bought'] = (
            df.user_total_orders - df.z.map(userXproduct.first_order_number)).astype(np.float32)
        df['UP_chance'] = (df.UP_orders - 1)/(df.user_total_orders -
                                              df.z.map(userXproduct.first_order_number)).astype(np.float32)
        df['UP_chance_ratio'] = (1/(df.user_total_orders - df.UP_last_order_id.map(test_order.order_number)) - (
            df.UP_orders - 1)/(df.user_total_orders - df.z.map(userXproduct.first_order_number))).astype(np.float32)
        df.drop(['UP_last_order_id', 'z'], axis=1, inplace=True)
        df.drop(['order_id', 'product_id'], axis=1)
        # print(df.dtypes)
        return (df, labels)  # returns these two

    df_test, _ = features(test_orders)

    return df_test
