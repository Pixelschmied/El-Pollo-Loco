const level1 = new Level(

    [
        new Chicken(),
        //new Chicken(),
        //new Chicken(),
        new Endboss(),
    ],
    [
        new Cloud(),
        new Cloud()
    ],
    [
        new BackgroundObject('img/5_background/layers/air.png', -959), // Sky Layer
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -959), // Third Layer
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -959), // Second Layer
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -959), // First Layer

        new BackgroundObject('img/5_background/layers/air.png', 0), // Sky Layer
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0), // Third Layer
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0), // Second Layer
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0), // First Layer

        new BackgroundObject('img/5_background/layers/air.png', 959), // Sky Layer
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 959), // Third Layer
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 959), // Second Layer
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 959), // First Layer

        new BackgroundObject('img/5_background/layers/air.png', 959 * 2), // Sky Layer
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 959 * 2), // Third Layer
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 959 * 2), // Second Layer
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 959 * 2), // First Layer

        new BackgroundObject('img/5_background/layers/air.png', 959 * 3), // Sky Layer
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 959 * 3), // Third Layer
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 959 * 3), // Second Layer
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 959 * 3), // First Layer
    ]

);