/*!
 * rumcaJS
 * Sebastian Musiał - https://github.com/sebastianmusial/rumcaJS
 * Patryk Domałeczny
 * Free to use under terms of MIT license
 */

var RumcaJS = function(settings , elem) {

    //*********************************
    //  Variables
    //*********************************
    this.elem = $(elem);
    this.selector = elem.selector;
    this.options = settings;

    //*********************************
    //  Private methods
    //*********************************
    function swap(list ,a ,b) {
        var tmp = list[a];
        list[a] = list[b];
        list[b] = tmp;
    }

    function getNewData() {
        var $axisYLabels = elem.find('.chart__label-y');
        var $bars = elem.find('.bar__container');
        var barsLength = $bars.length;
        var newData = {
            "axisY": [],
            "bars": []
        };

        if (barsLength && $axisYLabels.length === barsLength) {
            for (var i = 0; i < barsLength; i++) {
                var text = $($axisYLabels[i]).text();
                var value = $($bars[i]).data('value');

                newData.barsLength = barsLength;
                newData.axisY.push(text);
                newData.bars.push(value);
            }

            return newData;
        }

        return 0;
    }

    function viewportAnimation($item, offset, repeat) {
        var viewport = $(window);
        var setVisible = function ($item, offset) {
            var viewportTop = viewport.scrollTop();
            var viewportBottom = viewport.scrollTop() + viewport.height() - offset;

            $item.each(function () {
                var self = $(this),
                    top = self.offset().top,
                    bottom = top + self.height(),
                    topOnScreen = top >= viewportTop && top <= viewportBottom,
                    betweenScreen = top <= viewportTop && bottom >= viewportBottom,
                    bottomOnScreen = bottom >= viewportTop && bottom <= viewportBottom,
                    elemVisible = topOnScreen || bottomOnScreen || betweenScreen;

                if(repeat) {
                    self.toggleClass('visible', elemVisible);
                }
                else {
                    self.addClass('visible', elemVisible);
                }
            });
        };

        setVisible($item, offset);

        viewport.scroll(function() {
            setVisible($item, offset);
        });
    }


    //*********************************
    //  Public methods
    //*********************************
    this.init = function(options) {
        var initCode =  '<div class="chart--top">' +
            '<div class="chart__axis-y"></div>' +
            '<div class="chart__box chart--horizontal"> ' +
                '<div class="chart__bars"></div>' +
            '</div>' +
        '</div>' +
        '<div class="chart__axis-x"></div>';

        this.elem.addClass('chart__container');
        this.elem.html(initCode);
        this.appendAll(options.data);
        this.selectMax();
        this.selectMin();


        if(!options.animation) {
            this.elem.addClass('visible');
        }
        else {
            viewportAnimation(this.elem, options.animationOffset, options.animationRepeat);
        }
        if(options.showValues) {
            this.elem.addClass('show-values');
        }
        if(options.showArrows) {
            this.elem.addClass('show-arrows');
        }
        if(options.showHorizontalLines) {
            this.elem.addClass('show-horizontal-lines');
        }
        if(options.labelsAboveBars) {
            this.elem.addClass('labels-above-bars');
        }
    };

    this.prependItem = function(name, value) {
        this.prependAxisY([name]);
        this.prependBars([value]);
    };

    this.prependAxisX = function(data) {
        var $axis = this.elem.find('.chart__axis-x');
        data.forEach(function(v) {
            var label = '<span class="chart__label-x">' + v + '</span>';
            $axis.prepend(label);
        });

        var $labels = $axis.find('span');
        var quantityOfLabels = $labels.length;

        $labels.width(100/quantityOfLabels + '%');
    };

    this.prependBars = function(data) {
        var $bars = this.elem.find('.chart__bars');

        data.forEach(function(v) {
            var bar = '<div class="bar__container" data-value="' + v + '" style="width:' + v + '%">' +
                        '<span class="bar"></span></div>';
            $bars.prepend(bar);
        });

        this.selectMax($(this));
        this.selectMin($(this));
    };

    this.prependAxisY = function(data) {
        var $axis = this.elem.find('.chart__axis-y');

        data.forEach(function(v) {
            var label = '<div class="chart__label-y"><span class="label-y__name">' + v + '</span></div>';
            $axis.prepend(label);
        });
    };

    this.prependAll = function(data) {
        this.prependAxisX(data.axisX);
        this.prependAxisY(data.axisY);
        this.prependBars(data.bars);
    };

    this.appendItem = function(name, value) {
        this.appendAxisY([name]);
        this.appendBars([value]);
    };

    this.appendAxisX = function(data) {
        var $axis = this.elem.find('.chart__axis-x');

        data.forEach(function(v) {
            var label = '<span class="chart__label-x">' + v + '</span>';
            $axis.append(label);
        });

        var $labels = $axis.find('span');
        var quantityOfLabels = $labels.length;

        $labels.width(100/quantityOfLabels + '%');
    };

    this.appendBars = function(data) {
        var $bars = this.elem.find('.chart__bars');

        data.forEach(function(v) {
            var bar = '<div class="bar__container" data-value="' + v + '" style="width:' + v + '%">' +
                        '<span class="bar"></span></div>';
            $bars.append(bar);
        });

        this.selectMax();
        this.selectMin();
    };

    this.appendAxisY = function(data) {
        var $axis = this.elem.find('.chart__axis-y');

        data.forEach(function(v) {
            var label = '<div class="chart__label-y"><span class="label-y__name">' + v + '</span></div>';
            $axis.append(label);
        });
    };

    this.appendAll = function(data) {
        this.appendAxisX(data.axisX);
        this.appendAxisY(data.axisY);
        this.appendBars(data.bars);
    };

    this.resetBars = function() {
        this.elem.find('.chart__bars').empty();
    };

    this.resetAxisX = function() {
        this.elem.find('.chart__axis-x').empty();
    };

    this.resetAxisY = function() {
        this.elem.find('.chart__axis-y').empty();
    };

    this.resetAll = function() {
        this.resetAxisX();
        this.resetAxisY();
        this.resetBars();
    };

    this.updateBars = function(data) {
        this.resetBars();
        this.appendBars(data);
    };

    this.updateAxisX = function(data) {
        this.resetAxisX();
        this.appendAxisX(data);
    };

    this.updateAxisY = function(data) {
        this.resetAxisY();
        this.appendAxisY(data);
    };

    this.updateAll = function(data) {
        this.resetAll();
        this.appendBars(data.bars);
        this.appendAxisX(data.axisX);
        this.appendAxisY(data.axisY);
    };

    this.removeItem = function(number) {
        var $axisYLabels = $charbox.find('.chart__label-y');
        var $bars = $charbox.find('.bar__container');

        $bars[number - 1].remove();
        $axisYLabels[number - 1].remove();
    };

    this.sortByName = function(desc) {
        var newData = getNewData();

        if (newData.barsLength) {
            for (var n = newData.barsLength; n > 1; --n) {
                for (var i = 0; i < n - 1; ++i) {
                    if (newData.axisY[i] > newData.axisY[i + 1]) {
                        swap(newData.bars, i, i + 1);
                        swap(newData.axisY, i, i + 1);
                    }
                }
            }

            this.addSortedData(newData, desc);
        }
        else {
            console.error('Number of bars is not equals number of axis Y labels.');
        }
    };

    this.sortByValue = function(desc) {
        var newData = getNewData();

        if (newData.barsLength) {
            for (var n = newData.barsLength; n > 1; --n) {
                for (var i = 0; i < n - 1; ++i) {
                    if (newData.bars[i] > newData.bars[i + 1]) {
                        swap(newData.bars, i, i + 1);
                        swap(newData.axisY, i, i + 1);
                    }
                }
            }

            this.addSortedData(newData, desc, this);
        }
        else {
            console.error('Number of bars is not equals number of axis Y labels.');
        }
    };

    this.addSortedData = function(data, desc) {
        if(desc){
            data.bars.reverse();
            data.axisY.reverse();
        }

        this.resetBars();
        this.appendBars(data.bars);
        this.resetAxisY();
        this.appendAxisY(data.axisY);
    };

    this.selectMax = function() {
        var $bars = this.elem.find('.bar__container');

        $bars.removeClass('max');

        var value = $bars.map(function() {
            return $(this).data('value');
        }).get();

        var max = Math.max.apply(Math, value);
        var $maxBar = $bars.filter('[data-value="' + max +'"]');

        $maxBar.addClass('max');
    };

    this.selectMin = function() {
        var $bars = this.elem.find('.bar__container');

        $bars.removeClass('min');

        var value = $bars.map(function() {
            return $(this).data('value');
        }).get();

        var min = Math.min.apply(Math, value);
        var $minBar = $bars.filter('[data-value="' + min +'"]');

        $minBar.addClass('min');
    };

    this.runAnimation = function() {
        this.elem.removeClass('visible');

        setTimeout(function() {
            this.elem.addClass('visible');
        }, 250);
    };


    //*********************************
    //  Invoke Initialization
    //*********************************
    this.init(this.options);
};


(function($) {

    //*********************************
    //  Defaults options
    //*********************************
    var defaults = {
        data: {},
        animation: true,
        animationOffset: 0,
        animationRepeat: true,
        showValues: true,
        showArrows: false,
        showHorizontalLines: false,
        labelsAboveBars: false
    };


    //*********************************
    //  Plugin definition
    //*********************************
    $.fn.rumcaJS = function(options) {
        if (typeof options === 'object' || ! options) {
            // Set options
            var settings = $.extend( {}, defaults, options);
            var newInstance = new RumcaJS(settings , this);

            return newInstance;
        }
        // Error
        else {
            $.error('Method or option ' + options + ' does not exist on RumcaJS');
        }
    };
})(jQuery);