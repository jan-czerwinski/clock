from random import randint

def generate_converter(): #reverses every second row, could be more pythonic
    conv = []
    for x in range(100):
        if x%20<10:
            conv.append(x)
        else:
            mod = x%10
            conv.append(x-2*mod+9) 
    return conv

CONVERTER = generate_converter()

DIRECTIONS = {
    0: "up",
    1: "right",
    2: "down",
    3: "left"
}

class Snake:
    coords=[42,43,44]
    direction = 1
    food = randint(0,99)

    def get_real_coords(self):
        output =[]
        for i in self.coords:
            output.append(CONVERTER[i])
        return output
        
    def get_real_food(self):
        return CONVERTER[self.food]

    def make_food(self):
        while self.food in self.coords:
            self.food = randint(0,99)

    def change_direction(self, turn_right):
        changer = 1 if turn_right else -1
        self.direction = (self.direction+changer) %4

    def next_position(self):
        head = self.coords[-1]
        direction = DIRECTIONS[self.direction]
        if direction == "up":
            output = head-10 if head>=10 else 90 + head
        elif direction == "right":
            output = head+1 if head%10!=9 else head-9
        elif direction == "down":
            output = head+10 if head>=90 else head-90
        elif direction == "left":
            output = head-1 if head%10!=0 else head+9
        return CONVERTER[output]
    
    def get_delay(self):
        return 0.5

    def update(self):
        next_position = self.next_position()
        if next_position in self.coords:
            return False
        if next_position != self.food:
            self.coords.remove(0)
        self.coords.append(next_position)
        self.make_food()
        return True