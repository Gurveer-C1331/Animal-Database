import ast
import pickle

#loads and returns the map data from file
def load_MapData():
  file = open(r"C:\Users\DELL\Documents\Computer Science\Projects\Animal-Database-(Electron)\python-src\Map_Data.txt", "r")
  data = []
  for line in file:
    data.append(ast.literal_eval(line))
  return data

#updates and saves the map data to file
def update_MapData(countries, type):
  data = load_MapData()
  #1 is added or subtracted to those countries in countries
  for country in countries:
    for array in data:
      if array[0] == country:
        #1 is added or subtracted based on type
        if type.lower() == "add": array[1] += 1
        else: array[1] += -1
  file = open(r"C:\Users\DELL\Documents\Computer Science\Projects\Animal-Database-(Electron)\python-src\Map_Data.txt", "w")
  for array in data:
    file.write(str(array))
    file.write("\n")

#loads and returns the diet data from file
def load_DietData():
  file = open(r"C:\Users\DELL\Documents\Computer Science\Projects\Animal-Database-(Electron)\python-src\Diet_Data.txt", "r")
  data = []
  for line in file:
    data.append(ast.literal_eval(line))
  return data

#updates and saves the diet data to file
def update_DietData(diet, type):
  data = load_DietData()
  for array in data:
    if array[0] == diet:
      #1 is added or subtracted based on type
      if type.lower() == "add": array[1] += 1
      else: array[1] += -1
  file = open(r"C:\Users\DELL\Documents\Computer Science\Projects\Animal-Database-(Electron)\python-src\Diet_Data.txt", "w")
  for array in data:
    file.write(str(array))
    file.write("\n")

#loads and returns the class data from file
def load_ClassData():
  file = open(r"C:\Users\DELL\Documents\Computer Science\Projects\Animal-Database-(Electron)\python-src\Class_Data.txt", "r")
  data = []
  for line in file:
    data.append(ast.literal_eval(line))
  return data

#updates and saves the class data to file
def update_ClassData(animal_class, type):
  data = load_ClassData()
  for array in data:
    if array[0].lower() == animal_class.lower():
      #1 is added or subtracted based on type
      if type.lower() == "add": array[1] += 1
      else: array[1] += -1
  file = open(r"C:\Users\DELL\Documents\Computer Science\Projects\Animal-Database-(Electron)\python-src\Class_Data.txt", "w")
  for array in data:
    file.write(str(array))
    file.write("\n")

#loads and returns the status data from file
def load_StatusData():
  file = open(r"C:\Users\DELL\Documents\Computer Science\Projects\Animal-Database-(Electron)\python-src\Status_Data.txt", "r")
  data = []
  for line in file:
    data.append(ast.literal_eval(line))
  return data

#updates and saves the status data to file
def update_StatusData(status, type):
  data = load_StatusData()
  for array in data:
    if array[0].lower() == status.lower():
      #1 is added or subtracted based on type
      if type.lower() == "add": array[1] += 1
      else: array[1] += -1
  file = open(r"C:\Users\DELL\Documents\Computer Science\Projects\Animal-Database-(Electron)\python-src\Status_Data.txt", "w")
  for array in data:
    file.write(str(array))
    file.write("\n")