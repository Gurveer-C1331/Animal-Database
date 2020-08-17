class Animal_List:

    def __init__(self):
        self.animal_list = []

    #returns the list of the database    
    def getList(self):
        return self.animal_list
    
    #adds a list (used to load the database's list)
    def addList(self, list):
        self.animal_list = list
    
    #checks if the new entry is a duplicate
    def check_Animal(self, name):
        for obj in self.animal_list:
            if name.upper() == obj.get_Name():
                return False 
        return True

    #adds new animal entry to the database list
    def add_Animal(self, animal):
        self.animal_list.append(animal)
    
    #remove an animal entry in the database list
    def remove_Animal(self, animal):      
        self.animal_list.remove(animal)