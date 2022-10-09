const BOARD = {
    WIDTH : 10,
    HEIGHT : 15,
    BLOCKSIZE : 30
};

const TETROMINO = [
    {
        shape : [
            [1, 0, 0],
            [1, 0, 0],
            [1, 1, 0]
        ],
        color : 'purple' //set
    },
    {
        shape : [
            [0, 2, 0],
            [0, 2, 0],
            [2, 2, 0]
        ],
        color : 'orange' //set
    },
    {
        shape : [
            [3, 0, 0],
            [3, 3, 0],
            [0, 3, 0]
        ],
        color : 'yellow' //set
    },
    {
        shape : [
            [0, 4, 0],
            [4, 4, 0],
            [4, 0, 0]
        ],
        color : 'blue' //set
    },
    {
        shape : [
            [5, 0, 0],
            [5, 5, 0],
            [5, 0, 0]
        ],
        color : 'red' //set
    },
    {
        shape : [
            [6, 6],
            [6, 6],
        ],
        color : 'lightblue' //set
    },
    {
        shape : [
            [7, 0, 0, 0],
            [7, 0, 0, 0],
            [7, 0, 0, 0],
            [7, 0, 0, 0]
        ],
        color : 'green' //set
    }

];