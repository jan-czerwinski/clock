def change_direction(direction, turn_right):
    changer = 1 if turn_right else -1
    direction = (direction+changer) %4
    print( direction)

change_direction(3,True)
change_direction(3,False)
change_direction(0,True)
change_direction(0,False)
