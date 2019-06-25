import numpy as np
import matplotlib.pyplot as plt
import random
import copy
import json

def loop_grid(matrix, mkd, a):

    # protential grid
    transH = np.ones((100,100))
    transI = np.ones((100,100))
    transC = np.ones((100,100))

    list_distances = [1, 1.4, 2, 2.2, 2.8, 3, 3.2, 3.6, 4, 4.1, 4.2, 4.5, 5, 5.1, 5.4, 5.7, 5.8, 6, 6.1, 6.3, 6.4, 6.7, 7.1, 7.2, 7.8, 8.5]

    #i,j current house grid
    for i in range(len(matrix)):
        for j in range(len(matrix[0])):
            # k,l is neighbourhood
            for k in range(i-6, i+7):
                for l in range(j-6, j+7):

                    #only if neighboorhoud exists
#                   check if the neigbours are inside grid
                    if k < 0 or k > 99 or l < 0 or l > 99:
                        continue

                    else:
                        '''zoek op in dict:
                        ik ben zelf Matrix[i,j]
                        ik kijk naar Matrix[k,l]
                        ik kan worden loop [H, I, C] en update probabilitygrid
                        Eet een koekje
                        '''

#                       als degene waar je naar kijkt een huis is
                        if matrix[k, l] != 0 and (k, l) != (i, j) and matrix[i, j] != 3:

#                           op basis van hoe ver het huis van je vandaan zit krijg je een score uit de mkd
                            # Trans House potential

                            distance = round(np.sqrt((abs(i - k))**2 + (abs(l - j))**2), 1)
                            index_distance = list_distances.index(distance)


                            # kans op house worden, met wat we zelf zijn (matrix[i, j]) bepaald door plek waar we kijken en distance
#                             print(mkd[int(matrix[i, j])][1][int(matrix[k, l])][distance])
                            if matrix[i, j] != 2 and matrix[i, j] != 3:
                                transH[i, j] += mkd[int(matrix[i, j])][1][int(matrix[k, l])-1][index_distance]

                            # Trans Industry potential
                            if matrix[i, j] != 3:
                                transI[i, j] += mkd[int(matrix[i, j])][2][int(matrix[k, l])-1][index_distance]

                            # Trans Commerce potential
                            transC[i, j] += mkd[int(matrix[i, j])][3][int(matrix[k, l])-1][index_distance]

    for i in range(len(transH)):
        for j in range(len(transH[0])):
            S = 1 + (-np.log(random.random()))**(a)
            transH[i, j] *= S
            S = 1 + (-np.log(random.random()))**(a)
            transI[i, j] *= S
            S = 1 + (-np.log(random.random()))**(a)
            transC[i, j] *= S


    return transH, transI, transC


# V, H, I, C
# 0, 1, 2, 3

width = 100
height = 100

city = np.zeros((width, height))

steps = 40

initial_commerce = []
initial_industry = []
initial_houses = [(49,49)]

for com in initial_commerce:
    city[com] = 3

for ind in initial_industry:
    city[ind] = 2

for h in initial_houses:
    city[h] = 1

# city[(25, 25)] = 1
plt.matshow(city, cmap = 'Greys')
plt.colorbar()
plt.show()

Nh = 0.05
a = 1.1

mkd = {0: {1: [[2,2,1.5,1.5,1,1,1,1,0.5,0.5,0.5,0.5,0.5,0.1,0.1,0.1,0.1,0.1,0,0,0,0,0,0,0,0],
               [-10,-10,-5,-3,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
               [-2,-1,2,1,1,1,0.5,0.5,0.4,0.3,0.2,0.1,0.1,0.1,0,0,0,0,0,0,0,0,0,0,0,0]],
           2: [[-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
               [3,3,2,1,0,0.2,0.2,0.2,0.2,0.2,0.2,0.2,0.2,0.2,0.2,0.2,0.2,0.2,0,0,0,0,0,0,0,0],
               [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],
           3: [[4,3.5,3,2.5,2,2,2,1.5,1.5,1.5,1.5,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
               [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
               [25,25,25,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,0]]},
       1: {1: [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
               [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
               [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],
           2: [[-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
               [2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
               [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],
           3: [[4,3.5,3,2.5,2,2,2,1.5,1.5,1.5,1.5,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
               [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
               [25,25,25,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,0,0,0,0,0,0,0,0]]},
       2: {1: [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
               [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
               [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],
           2: [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
               [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
               [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],
           3: [[4,3.5,3,2.5,2,2,2,1.5,1.5,1.5,1.5,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
               [-2,-2,-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
               [25,25,25,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,0,0,0,0,0,0,0,0]]}}

citiesovertime = []
citiesovertime.append(copy.deepcopy(city))

for step in range(steps):
    transH, transI, transC = loop_grid(city, mkd, a)

    orderedhouses = transH.flatten().argsort()[::-1]
    orderedindustry = transI.flatten().argsort()[::-1]
    orderedcommerce = transC.flatten().argsort()[::-1]

    newhouses = orderedhouses[0:round((((width*height)*Nh)/12)*7)]
    for house in range(round((((width*height)*Nh)/12)*7)):
        orderedhouses = np.delete(orderedhouses, house)

    newindustry = orderedindustry[0:round((((width*height)*Nh)/12)*4)]
    for ind in range(round((((width*height)*Nh)/12)*4)):
        orderedindustry = np.delete(orderedindustry, ind)

    newcommerce = orderedcommerce[0:round(((width*height)*Nh)/12)]
    for com in range(round(((width*height)*Nh)/12)):
        orderedcommerce = np.delete(orderedcommerce, com)

    while len(set(newcommerce) & set(newindustry)) != 0:
        for doubleindex in (set(newcommerce) & set(newindustry)):
            if transI[doubleindex//width, doubleindex%height] > transC[doubleindex//width, doubleindex%height]:
                newcommerce = np.delete(newcommerce, np.where(newcommerce == doubleindex)[0])
                newcommerce = np.append(newcommerce, orderedcommerce[0])
                orderedcommerce = np.delete(orderedcommerce, 0)
            else:
                newindustry = np.delete(newindustry, np.where(newindustry == doubleindex)[0])
                newindustry = np.append(newindustry, orderedindustry[0])
                orderedindustry = np.delete(orderedindustry, 0)

    while len(set(newcommerce) & set(newhouses)) != 0:
        for doubleindex in (set(newcommerce) & set(newhouses)):
            if transH[doubleindex//width, doubleindex%height] > transC[doubleindex//width, doubleindex%height]:
                newcommerce = np.delete(newcommerce, np.where(newcommerce == doubleindex)[0])
                newcommerce = np.append(newcommerce, orderedcommerce[0])
                orderedcommerce = np.delete(orderedcommerce, 0)
            else:
                newhouses = np.delete(newhouses, np.where(newhouses == doubleindex)[0])
                newhouses = np.append(newhouses, orderedhouses[0])
                orderedhouses = np.delete(orderedhouses, 0)

    while len(set(newhouses) & set(newindustry)) != 0:
        for doubleindex in (set(newhouses) & set(newindustry)):
            if transI[doubleindex//width, doubleindex%height] > transH[doubleindex//width, doubleindex%height]:
                newhouses = np.delete(newhouses, np.where(newhouses == doubleindex)[0])
                newhouses = np.append(newhouses, orderedhouses[0])
                orderedhouses = np.delete(orderedhouses, 0)
            else:
                newindustry = np.delete(newindustry, np.where(newindustry == doubleindex)[0])
                newindustry = np.append(newindustry, orderedindustry[0])
                orderedindustry = np.delete(orderedindustry, 0)


    for com in newcommerce:
        city[com//width, com%height] = 3

    for indus in newindustry:
        if city[indus//width, indus%height] != 3:
            city[indus//width, indus%height] = 2

    for house in newhouses:
        if city[house//width, house%height] != 2 and city[house//width, house%height] != 3:
            city[house//width, house%height] = 1

    citiesovertime.append(copy.deepcopy(city))
    print(step)

array = citiesovertime
diclist = {}

for h in range(len(array)):
	diclist[h] = {"time": h, "values": []}
	for i in range(len(array[0])):
		for j in range(len(array[0][0])):
			diclist[h]["values"].append({"x": j, "y": i, "value":array[h][i][j]})

with open('gridx11x100.json', 'w') as outfile:
    json.dump(diclist, outfile)
