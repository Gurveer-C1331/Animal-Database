import ast

class Animal:
    
    def __init__(self, name):
        #Constructor
        self.name = name.upper()

    def add_Range(self, range):
        #adds the range information to the animal
        self.range = range
        
        #continents arrays containing alpha-2 country codes
        afrcia = ["DZ", "EG", "EH", "LY", "MA", "SD", "SS", "TN", "BF", "BJ", "CI", "CV", "GH", "GM", "GN", "GW", "LR", "ML", "MR", "NE", "NG", "SH", "SL", "SN", "TG", "AO", "CD", "ZR", "CF", "CG", "CM", "GA", "GQ", "ST", "TD", "BI", "DJ", "ER", "ET", "KE", "KM", "MG", "MU", "MW", "MZ", "RE", "RW", "SC", "SO", "TZ", "UG", "YT", "ZM", "ZW", "BW", "LS", "NA", "SZ", "ZA"]
        europe = ["GG", "JE", "AX", "DK", "EE", "FI", "FO", "GB", "IE", "IM", "IS", "LT", "LV", "NO", "SE", "SJ", "AT", "BE", "CH", "DE", "DD", "FR", "FX", "LI", "LU", "MC", "NL", "BG", "BY", "CZ", "HU", "MD", "PL", "RO", "RU", "SU", "SK", "UA", "AD", "AL", "BA", "ES", "GI", "GR", "HR", "IT", "ME", "MK", "MT", "RS", "PT", "SI", "SM", "VA", "YU"]
        north_america = ["BM", "CA", "GL", "PM", "US", "AG", "AI", "AN", "AW", "BB", "BL", "BS", "CU", "DM", "DO", "GD", "GP", "HT", "JM", "KN", "KY", "LC", "MF", "MQ", "MS", "PR", "TC", "TT", "VC", "VG", "VI", "BZ", "CR", "GT", "HN", "MX", "NI", "PA", "SV"]
        south_america = ["AR", "BO", "BR", "CL", "CO", "EC", "FK", "GF", "GY", "PE", "PY", "SR", "UY", "VE"]
        asia = ["TM", "TJ", "KG", "KZ", "UZ", "CN", "HK", "JP", "KP", "KR", "MN", "MO", "TW", "AF", "BD", "BT", "IN", "IR", "LK", "MV", "NP", "PK", "BN", "ID", "KH", "LA", "MM", "BU", "MY", "PH", "SG", "TH", "TL", "TP", "VN", "AE", "AM", "AZ", "BH", "CY", "GE", "IL", "IQ", "JO", "KW", "LB", "OM", "PS", "QA", "SA", "NT", "SY", "TR", "YE", "YD"]
        oceania = ["AU", "NF", "NZ", "FJ", "NC", "PG", "SB", "VU", "FM", "GU", "KI", "MH", "MP", "NR", "PW", "AS", "CK", "NU", "PF", "PN", "TK", "TO", "TV", "WF", "WS"]
        
        file = open(r"C:\Users\DELL\Documents\Computer Science\Projects\Animal-Database-(Electron)\country_codes.txt", "r")
        country_data = [] #stores data from file
        range_alphaCodes = [] #stores the alpha-2 country codes for each region in range
        continent = [] #stores the continents the animal lives in
        for line in file:
            country_data.append(ast.literal_eval(line))
        
        #appending all alpha-2 codes based on the countries in range
        for country in range:
            for element in country_data:
                if country.lower() == element["name"].lower():
                    range_alphaCodes.append(element["alpha-2"])

        #checking if antarctica is in range           
        if "Antarctica" in range: continent.append("ANTARCTICA")
        #appending continents to continent based on the alpha-2 codes in range_alphaCodes
        for regionCode in range_alphaCodes:
            if regionCode in afrcia and "AFRICA" not in continent: continent.append("AFRICA")
            elif regionCode in europe and "EUROPE" not in continent: continent.append("EUROPE")
            elif regionCode in north_america and "NORTH AMERICA" not in continent: continent.append("NORTH AMERICA")
            elif regionCode in south_america and "SOUTH AMERICA" not in continent: continent.append("SOUTH AMERICA")
            elif regionCode in asia and "ASIA" not in continent: continent.append("ASIA")
            elif regionCode in oceania and "OCEANIA" not in continent: continent.append("OCEANIA")
        self.add_Continent(continent) #adding continent information

    def add_Continent(self, continent):
        #adds the continent the animal lives in
        self.continent = continent
    
    def add_Class(self, animal_class):
        #adds the animal class to the animal
        self.animal_class = animal_class

    def add_Diet(self, diet_type):
        #adds the diet information to the animal
        self.diet_type = diet_type
    
    def add_Status(self, status):
        #adds the conservation status information to the animal
        self.status = status
    
    def add_Image(self, image_path):
        #adds the image path information to the animal
        self.image_path = image_path.lower()

    def get_Name(self):
        #returns the name of the animal
        return self.name
        
    def get_Range(self):
        #returns the habitat information
        return self.range
    
    def get_Continent(self):
        #returns the continent
        return self.continent

    def get_Class(self):
        #returns the animal class
        return self.animal_class

    def get_Diet(self):
        #returns the diet information
        return self.diet_type

    def get_Status(self):
        #returns the conservation status information
        return self.status

    def get_Image(self):
        #returns the image path
        return self.image_path

