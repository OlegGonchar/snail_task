$(function() {

    var $num = $('#number'),
        $btn = $('#btn'),
        $matrix = $('#matrix'),
        $sum = $('#sum');

    $btn.click(function () {
        var $n = $num.val();
        $matrix.html('');
        for (var i = 0; i < $n; i++) {
            var $div = $('<div class = "row row' + i + '"></div>');
            for (var j = 0; j < $n; j++) {
                var $divCell = $('<div class="cell cell' + j + '"></div>');
                $div.append($divCell);
            }
            $matrix.append($div);
        }
        var arr = createMatrix($n);
        snail(arr);
    });

//Creates matrix with references to divs so that we could change them in the 'snail' function
    function createMatrix(dimension) {
        var $rows = [];
        for (var x = 0; x < dimension; x++) {
            $rows[x] = [];
            for (var y = 0; y < dimension; y++) {
                $rows[x][y] = $('.row' + x + ' .cell' + y);
            }
        }
        return $rows;
    };

// Function goes like snail through all divs.
// Calls 'inner' function for each div element.
    function snail(arr) {
        var i = 0,
            j = 0,
            counter = 1,
            dim = arr.length,
            step = 0;
        for (dim; dim > 0; dim--, step++) {
            for (j; j < dim; j++) {
                inner(i,j,arr, counter);
                counter++;
            };
            i++;
            j--;
            for (i; i < dim; i++) {
                inner(i,j,arr,counter);
                counter++;
            }
            i--;
            j--;
            for (j; j >= step; j--) {
                inner(i,j,arr,counter);
                counter++;
            }
            ;
            i--;
            j++;
            for (i; i > step; i--) {
                inner(i,j,arr,counter);
                counter++;
            }
            i++;
            j++;
        }
    };


// Write the proper count number for every div-snail element
// make handlers for mouseover mouseleave and doubleclick
    function inner(i,j,arr,counter){
        arr[i][j].html(counter);
        arr[i][j].mouseover(function(){
            countSum(arr,i,j)
        });
        arr[i][j].mouseleave(function(){
            $sum.html('');
        })
        arr[i][j].dblclick(function(event){
            var count = +$(this).html();
            count--;
            if (count!==-1){
                $(this).html(count);
            }
            event.preventDefault();
        })
    };


// Counts the sum of all previous elements in snail positions for current element.
// write this sum in the span below the matrix
//p.s. even if one of previous elements has been changed by double click.
    function countSum(arr,n,m) {
        var x = 0,
            y = 0,
            sum = 0,
            dim = arr.length,
            step = 0;
        checkPoint:
        for (dim; dim > 0; dim--, step++) {
            for (y; y < dim; y++) {
                sum += +arr[x][y].html();
                if (n === x && m === y) break checkPoint;
            };
            x++;
            y--;
            for (x; x < dim; x++) {
                sum += +arr[x][y].html();
                if (n === x && m === y)
                    break checkPoint;
            };
            x--;
            y--;
            for (y; y >= step; y--) {
                sum += +arr[x][y].html();
                if (n === x && m === y)
                    break checkPoint;
            };
            x--;
            y++;
            for (x; x > step; x--) {
                sum += +arr[x][y].html();
                if (n === x && m === y)
                    break checkPoint;
            }
            x++;
            y++;
        }

        $sum.html(sum);
    }

});