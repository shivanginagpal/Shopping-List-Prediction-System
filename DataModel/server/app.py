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

model = pickle.load(open("server/finalized_model.sav", "rb"))
app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
cors = CORS(app)

# Mongo DB connection
# app1 = Flask(__name__)
app.config["MONGO_URI"] = mongoURI
app.config['SECRET_KEY'] = secret
mongo = PyMongo(app)
db = mongo.db


# test to insert data to the data base


@app.route("/test")
def test():
    user = db.users.find_one({"_id": ObjectId('5f75adfd3061208ff4f01db6')})
    print(user['name'])
    return "Connected to the data base!"


@app.route("/getLists")
def getList():
    for doc in db.lists.find({"user": ObjectId('5f75adfd3061208ff4f01db6')}):
        print(doc['listName'])
        print("Order Id", doc['_id'])
        print(doc['item'])
    return "Success"
    # return(({'result': user['listName']})), 201


@ app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)


@ app.route("/")
def hello():
    return "Hello World!"


# @app.route("/get_prediction", methods=['POST', 'OPTIONS'])
@ app.route("/get_prediction", methods=['GET'])
@ cross_origin()
def get_prediction():
    '''
    response = jsonify('Hello World!!!')
    response.status_code = 200

    return response

    if not request.json:
        abort(400)
    '''

    df_test = pd.read_csv(r'server/df_test.csv')
    # return (jsonify({"res": "Hello world"})), 201
    print("*******************Here******************", file=sys.stderr)

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
        if row.pred > 0.3:
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
    print(type(out))
    print(len(out))
    print(out[0])

    # print(f'******* here****, {out.split(" ")}',)
    res = list(map(int, out[0].split(" ")))
    print(f"my prods are:", res)

    return(({'result': res})), 201


if __name__ == "__main__":
    app.run()
