from Animal import Animal
import ast
   
def save_Database(list):
    #saves the database's list in a text file
    #input: database's list
    animal_list = []
    for obj in list: #create a list to hold all the information entered to the database
        #retrieve all the information
        continent = obj.get_Continent()
        range_info = obj.get_Range()
        range_info.sort()
        animal_class = obj.get_Class()
        diet_type = obj.get_Diet()
        con_status = obj.get_Status()
        image_path = obj.get_Image()
        animal_info = []
        #appending all the information to an array
        animal_info.append(continent)
        animal_info.append(range_info)
        animal_info.append(animal_class)
        animal_info.append(diet_type)
        animal_info.append(con_status)
        animal_info.append(image_path)
        animal_list.append([obj.get_Name(), animal_info]) #append total animal data to main array      
    nameHandle = open(r"C:\Users\DELL\Documents\Computer Science\Projects\Animal-Database-(Electron)\python-src\Animal_Database.txt", "w")
    for animal in animal_list:
        nameHandle.write(str(animal))
        nameHandle.write("\n")

def load_Database():
    #loads the database's list from a text file and returns the list
    nameHandle = open(r"C:\Users\DELL\Documents\Computer Science\Projects\Animal-Database-(Electron)\python-src\Animal_Database.txt", "r")
    animal_list = []
    for line in nameHandle:
        animal = ast.literal_eval(line) #converts the string containing a single list to a list
        animal_info = animal[1]
        obj = Animal(animal[0]) #creates an entry based on the information in the array
        #adding all the information to the animal object
        obj.add_Range(animal_info[1])
        obj.add_Class(animal_info[2])
        obj.add_Diet(animal_info[3])
        obj.add_Status(animal_info[4])
        obj.add_Image(animal_info[5])
        animal_list.append(obj) #adds the Animal object to the list
    return animal_list