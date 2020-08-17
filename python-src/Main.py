from flask import Flask, request, make_response, jsonify
import Save_Load_Database
from Animal_List import Animal_List
import Data
from Animal import Animal

app = Flask(__name__)

#creating database list object
animal_list = Animal_List()
    
#loading in database from file (called on the startup of the application)
@app.route("/startup", methods=["POST"])
def startup():
  #loads the existing list of the database to the animal_list object
  animal_list.addList(Save_Load_Database.load_Database())
  #response
  res = make_response(jsonify({"message": "Database successfully loaded"}), 200)
  return res

#saving the database to file 
def exit():
  #saves the current database list
  Save_Load_Database.save_Database(animal_list.getList())

#sending map data
@app.route("/map_data", methods=["GET"])
def map_data():
  data = Data.load_MapData()
  #response
  res = make_response(jsonify(data))
  return res

#sending piechart data
@app.route("/piechart_data", methods=["GET"])
def piechart_data():
  data = []
  data.append(Data.load_DietData())
  data.append(Data.load_ClassData())
  data.append(Data.load_StatusData())
  #response
  res = make_response(jsonify(data))
  return res

#sending database population number
@app.route("/population", methods=["GET"])
def getPopulation():
  population = len(animal_list.getList())
  res = make_response(jsonify(population))
  return res

#creating a new animal entry to the database
@app.route("/creating_animal", methods=["POST"])
def creating_animal():
  #recieving the data
  data = request.get_json()
  #sending response to notify whether creating new entry was successful
  res = make_response(jsonify(animal_list.check_Animal(data[0])))
  if animal_list.check_Animal(data[0]): #checking if entry is not a duplicate
    new_animal = Animal(data[0]) #creating new animal object
    #adding in all the information
    new_animal.add_Diet(data[1])
    new_animal.add_Class(data[2])
    new_animal.add_Status(data[3])
    new_animal.add_Range(data[4])
    new_animal.add_Image(data[5])
    animal_list.add_Animal(new_animal) #adding new animal object to the list
    #updates the map and piechart data
    Data.update_MapData(data[4], "add")
    Data.update_DietData(data[1], "add")
    Data.update_ClassData(data[2], "add")
    Data.update_StatusData(data[3], "add")
    #saves the current database list
    exit()
  return res

#removes an animal entry from the database
@app.route("/remove_animal", methods=["POST"])
def remove_animal():
  data = request.get_json().upper()
  #making response whether the animal name given exits in the database
  res = make_response(jsonify(not animal_list.check_Animal(data)))
  if not animal_list.check_Animal(data): #checking name given exists in the database
    list = animal_list.getList()
    for animal in list:
      if data.upper() == animal.get_Name():
        #updates the stats (removes any data associated with the animal)
        Data.update_MapData(animal.get_Range(), "remove")
        Data.update_DietData(animal.get_Diet(), "remove")
        Data.update_ClassData(animal.get_Class(), "remove")
        Data.update_StatusData(animal.get_Status(), "remove")
        animal_list.remove_Animal(animal) #removes animal object from the database
        #saves the current database list
        exit()
  return res

#saves any edits/changes made to an animal
@app.route("/editing_animal", methods=["POST"])
def edit_animal():
  data = request.get_json()

  list = animal_list.getList()
  for animal in list:
    if data[0].upper() == animal.get_Name():
      #updates the stats (remove)
      Data.update_MapData(animal.get_Range(), "remove")
      Data.update_DietData(animal.get_Diet(), "remove")
      Data.update_ClassData(animal.get_Class(), "remove")
      Data.update_StatusData(animal.get_Status(), "remove")
      #update animal information
      animal.add_Diet(data[1])
      animal.add_Class(data[2])
      animal.add_Status(data[3])
      animal.add_Range(data[4])
      animal.add_Image(data[5])
      #updates the stats (add)
      Data.update_MapData(data[4], "add")
      Data.update_DietData(data[1], "add")
      Data.update_ClassData(data[2], "add")
      Data.update_StatusData(data[3], "add")
      #saves the current database list
      exit()
  res =  make_response(jsonify("successful"))
  return res

#sending the list of names for search by continent
@app.route("/searchBy_continent", methods=["POST"])
def searchBy_continent():
  data = request.get_json()

  names = []
  list = animal_list.getList()
  #collecting all animals based on continent selected
  for animal in list:
    if data in animal.get_Continent():
      names.append(animal.get_Name())
  names.sort()
  res = make_response(jsonify(names))
  return res

#sending the list of names for search by name
@app.route("/searchBy_name", methods=["POST"])
def searchBy_name():
  data = request.get_json()

  names = []
  list = animal_list.getList()
  #collecting all animals based on letters entered
  for animal in list:
    if data.upper() in animal.get_Name():
      names.append(animal.get_Name())
  names.sort()
  res = make_response(jsonify(names))
  return res

#sending animal data based on the animal selected
@app.route("/getAnimal", methods=["POST"])
def getAnimal():
  data = request.get_json()

  send_data = []
  list = animal_list.getList()
  for animal in list:
    if data.upper() == animal.get_Name():
      #adding all information to array
      send_data.append(animal.get_Name())
      send_data.append(animal.get_Class())
      send_data.append(animal.get_Diet())
      send_data.append(animal.get_Status())
      send_data.append(animal.get_Range())
      send_data.append(animal.get_Image())
  res = make_response(jsonify(send_data))
  return res

#sending the database list of names
@app.route("/listofNames", methods=["GET"])
def getNames():
  names = []
  list = animal_list.getList()
  print(list)
  for animal in list:
    names.append(animal.get_Name())
  names.sort()
  res = make_response(jsonify(names))
  return res

if __name__ == "__main__":
  app.run(host='127.0.0.1', port=5000)