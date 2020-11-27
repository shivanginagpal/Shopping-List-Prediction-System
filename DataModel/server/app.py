from __future__ import print_function
import pprint
import sys
from flask import Flask, jsonify, make_response, request, abort
import pandas as pd
import catboost
import pickle
from flask_cors import CORS, cross_origin
from flask_pymongo import PyMongo
from pymongo import MongoClient
from config.keys import *
from bson import ObjectId
from config.preprocess import *
from datetime import datetime

model = pickle.load(open("pickleFiles/finalized_model.sav", "rb"))

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
cors = CORS(app)

# Mongo DB connection
app.config["MONGO_URI"] = mongoURI
app.config['SECRET_KEY'] = secret
mongo = PyMongo(app)
db = mongo.db


# test to insert data to the data base
@ app.route("/test")
def test():
    user = db.users.find_one({"_id": ObjectId('5f75adfd3061208ff4f01db6')})
    return "Connected to the data base!"


@ app.route("/getLists")
def getList():
    data_test_prior = {
        'order_id':  [],
        'product_id': [],
        'add_to_cart_order': [],
        'reordered': []
    }
    data_test_order = {
        'order_id':  [],
        'user_id': [],
        'eval_set': [],
        'order_number': [],
        'order_dow': [],
        'order_hour_of_day': [],
        'days_since_prior_order': []
    }

    # the user id should come from front end as a parameter
    # we can not read the local storage of the frontend server from
    # the python flask server
    order_num = 0
    user_id = ObjectId('5e7c48e93dd7356fb55c5e71')
    user_id_masked = 11111
    order_id_masked = 1112223
    prev_time = 0
    for doc in db.lists.find({"user": user_id}):

        i = 0
        order_num += 1
        order_id_masked += 1
        # print(doc['listName'])
        #print("Order Id", doc['_id'])
        data_test_order['order_id'].append(order_id_masked)
        data_test_order['user_id'].append(user_id_masked)
        data_test_order['eval_set'].append("prior")
        data_test_order['order_number'].append(order_num)
        data_test_order['order_dow'].append(doc['date'].weekday())
        data_test_order['order_hour_of_day'].append(doc['date'].hour)

        if order_num == 1:
            data_test_order['days_since_prior_order'].append(0)
            prev_time = doc['date']
        else:
            curr_time = doc['date']
            days_elasped = curr_time - prev_time
            data_test_order['days_since_prior_order'].append(days_elasped.days)
            prev_time = curr_time

        for prod in doc['item']:
            #print("Prod is: ", prod)
            i += 1
            data_test_prior['order_id'].append(order_id_masked)
            if prod['product_id'] in data_test_prior['product_id']:
                data_test_prior['reordered'].append(1)
            else:
                data_test_prior['reordered'].append(0)
            data_test_prior['product_id'].append(prod['product_id'])
            data_test_prior['add_to_cart_order'].append(i)

        # print(doc['item'])

    df_test_prior = pd.DataFrame(
        data_test_prior, columns=['order_id', 'product_id', 'add_to_cart_order', 'reordered'])
    df_test_prior.to_csv('test/data_frame_test_prior.csv', index=False)

    # appending the "eval_value = test" as the last row
    data_test_order['order_id'].append('11112222')
    data_test_order['user_id'].append(user_id_masked)
    data_test_order['eval_set'].append("test")
    data_test_order['order_number'].append(order_num+1)
    data_test_order['order_dow'].append(datetime.now().weekday())
    data_test_order['order_hour_of_day'].append(datetime.now().hour)
    data_test_order['days_since_prior_order'].append(
        (datetime.now()-prev_time).days)

    df_test_order = pd.DataFrame(
        data_test_order, columns=['order_id', 'user_id', 'eval_set', 'order_number', 'order_dow',
                                  'order_hour_of_day', 'days_since_prior_order'])
    # print(df_test_order)
    df_test_order.to_csv('test/data_frame_test_order.csv', index=False)

    return "Success"


@ app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)


@ app.route("/")
def hello():
    return "Hello World!"


def currentUserRecommendationData():
    # file1 and file2 should be generate by the getLists function above
    file1 = 'test/data_frame_test_prior.csv'
    file2 = 'test/data_frame_test_order.csv'
    file3 = 'userDataCSV/products.csv'

    df_test = userPreprocessing(file1, file2, file3)

    return df_test


# @app.route("/get_prediction", methods=['POST', 'OPTIONS'])
@ app.route("/get_prediction/<user_id>", methods=['GET'])
@ cross_origin()
def get_prediction(user_id):

    print("In get prediction method")
    print(user_id)
    print(request)
    # generate the user prior and user order lists
    # TO DO: pass user ID to get list
    getList()

    df_test = currentUserRecommendationData()
    #print("*******************Here******************", file=sys.stderr)

    features_to_use = ['user_total_orders', 'user_total_items',
                       'total_distinct_items', 'user_average_days_between_orders',
                       'user_average_basket', 'order_dow',
                       'order_hour_of_day', 'days_since_prior_order', 'days_since_ratio',
                       'department_id', 'product_orders', 'product_reorders',
                       'product_reorder_rate', 'UP_orders', 'UP_orders_ratio',
                       'UP_average_pos_in_cart', 'UP_reorder_rate', 'UP_orders_since_last',
                       'UP_delta_hour_vs_last', 'UP_delta_dow_vs_last', 'UP_drop_chance',
                       'UP_chance_vs_bought', 'user_total_buy_max', 'UP_chance', 'UP_chance_ratio', 'aisle_id']
    preds = model.predict(df_test[features_to_use])
    df_test['pred'] = preds

    given_prods = {}

    for row in df_test.itertuples():
        if row.pred > 0.03:
            try:
                given_prods[row.order_id] += ' ' + str(row.product_id)
            except:
                given_prods[row.order_id] = str(row.product_id)

    for order in df_test.order_id:
        if order not in given_prods:
            given_prods[order] = 'None'

    # Creating dataframe of given products
    given_prods = pd.DataFrame.from_dict(given_prods, orient='index')
    given_prods.reset_index(inplace=True)
    given_prods.columns = ['order_id', 'products']

    out = (given_prods.products.values)

    # print(f'******* here****, {out.split(" ")}',)
    res = list(map(int, out[0].split(" ")))
    print(f"my prods are:", res)

    return(({'result': res})), 201


if __name__ == "__main__":
    app.run()
