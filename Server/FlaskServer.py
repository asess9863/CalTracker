from flask import Flask, request, jsonify
from flask_cors import CORS
import pymysql

app = Flask(__name__)
CORS(app)

#create connection
connection = pymysql.connect(
    host="localhost",
    user="marty",
    passwd="letmein",
    db="macrotracker"
)

print("Connected...")

# make SQL queries and return a tuple of table results
def Query(sql):
    with connection.cursor() as cursor:
        cursor.execute(sql)
        return cursor.fetchall()

# make a SQL query and return the last inserted row id of that table
def Execute(sql):
    with connection.cursor() as cursor:
        cursor.execute(sql)
        connection.commit()
        return cursor.lastrowid

@app.route('/search', methods=['POST'])
# function for loading/working within the page
def Search():
    # if we call a posting function from the page then we do this
    if request.method == "POST":
        # get input from page
        data = request.get_json(force=True)
        print("Incoming JSON:", data)
        Food = data.get('Name')
        print(Food)
        # SQL Query for food name
        sql = f"SELECT * FROM food WHERE Name = \"{Food}\""
        # two dimensional tuple so we need to go into the first result to get real data
        results = Query(sql)
        row = results[0]
        return jsonify({
            "message": "Food received",
            "food": {
                "id": row[0],
                "name": row[1],
                "calories": row[2],
                "protein": row[3],
                "carbs": row[4],
                "fats": row[5]
            }
        })
    else:
        return jsonify({"error": "Invalid data format or missing 'title' key"}), 400

@app.route('/Sum', methods=['POST'])
def Sum():
    # get info set from the client tier
    data = request.get_json()
    # Normally You would make a query to get the id from this. But I dont have time nor do I have multiple users so for now its hardcoded
    UserName = data.get('UserName')
    # this will sum each of the following categories when the interaction id is the correct id
    sql = f""" 
        SELECT 
            CAST(SUM(F.calories * S.AmountAte) AS SIGNED) AS TCAL,
            CAST(SUM(F.protein  * S.AmountAte) AS SIGNED) AS TP,
            CAST(SUM(F.carbs    * S.AmountAte) AS SIGNED) AS TCARB,
            CAST(SUM(F.fats     * S.AmountAte) AS SIGNED) AS TF
        FROM Servings AS S
        JOIN Food AS F ON S.FoodID = F.FoodID
        JOIN Composed AS C ON C.ServingID = S.ServingID
        JOIN Interactions AS I ON I.InteractionID = C.InteractionID
        WHERE I.UserID = 1;
    """
    # make the query happen
    Results = Query(sql)
    # return results of the query
    return(jsonify({"results":{
        "Calories": Results[0][0],
        "Protein": Results[0][1],
        "Carbs": Results[0][2],
        "Fats": Results[0][3]}
        }))

@app.route('/CreateFood', methods=['POST'])
def CreateFood():
    data = request.get_json()
    sql = f"""
            INSERT INTO Food (Name, Calories, Protein, Carbs, Fats) 
            VALUES (\"{data.get('Name')}\",{data.get('Calories')},{data.get('Protein')},{data.get('Carbs')},{data.get('Fats')})
           """
    Results = Execute(sql)
    return(jsonify({
        "Message": "Success"
    }))

@app.route('/logFood', methods=['POST'])
def Logger():
    data = request.get_json()
    Name = data.get("Name")
    print("Incoming Data: ", data)
    sql = f""" SELECT FoodID FROM Food WHERE Name = \"{Name}\" """
    FoodResult = Query(sql)
    foodID = FoodResult[0][0]
    sql = f""" INSERT INTO Interactions (UserID) VALUES (1); """
    InteractionID = Execute(sql)
    sql = f""" INSERT INTO Servings (AmountAte, FoodID) VALUES ({data.get("Servings")}, {foodID}); """
    ServingID = Execute(sql)
    sql = f""" INSERT INTO Composed (InteractionID, ServingID) VALUES ({InteractionID}, {ServingID}) """
    Execute(sql)
    return(jsonify({
        "Message": "Success"
    }))


# run app
if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)