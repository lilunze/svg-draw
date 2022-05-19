/*
 * @Author: lilunze
 * @LastEditors: lilunze
 */
import { SVG } from '@svgdotjs/svg.js';

class Draw {
    $canvas: any;
    $shape = 'rect';
    $elements: Array<any> = [];
    $brush: any;
    constructor(el: string) {
        this.$canvas = SVG().addTo(el).size('100%', '100%');
        this._mousemove();
        this.$brush = new Brush()
    }

    // 鼠标移动
    _mousemove() {
        // 是否按下鼠标
        let isPress = false;
        // 起点坐标
        let coordinateStart: Array<number> = [];
        // 终点坐标
        let coordinateEnd = [];
        // 绘制实例
        let $el: any = null;
        // 监听鼠标keyDown，并记录坐标
        this.$canvas.on(['mousedown','touchstart'],(e: any) => {
            if (e.button === 0) {
                // 鼠标左键
                isPress = true
                const x = e.offsetX
                const y = e.offsetY
                coordinateStart = [x, y]

                // 开始绘制
                $el = this.shapeInstance(coordinateStart)

                this.$elements.push($el)
            } else if (e.button === 1) {
                // 鼠标中键
            } else if (e.button === 2) {
                // 鼠标右键
            }
        })

        // 监听鼠标拖动，并记录坐标
        this.$canvas.on(['mousemove', 'touchmove'], (e: any) => {
            if (isPress) {
                const x = e.offsetX
                const y = e.offsetY
                this.$brush.draw({ $el, coordinateStart, coordinate: [x, y]})
            }
        })

        // 监听鼠标keyUp
        this.$canvas.on(['mouseup', 'touchleave'], (e: any) => {
            isPress = false
            const x = e.offsetX
            const y = e.offsetY
            coordinateEnd = [x, y]
            $el = null
        })
    }

    setShape(shape: string) {
        this.$shape = shape
    }

    shapeInstance(coordinateStart: any) {
        let shapeIntance = null
        if (this.$shape === 'rect') {
            shapeIntance = this.$canvas.rect(0, 0)
        } else if (this.$shape === "circle") {
            shapeIntance = this.$canvas.circle(0, 0)
        } else if (this.$shape === "ellipse") {
            shapeIntance = this.$canvas.ellipse(0, 0)
        } else if(this.$shape === "segment") {
            shapeIntance = this.$canvas.line(0, 0, 0, 0).stroke({ width: 1 })
        } else if(this.$shape === 'write') {
            try{
                shapeIntance = this.$canvas.path(`M${coordinateStart[0]} ${coordinateStart[1]} C ${coordinateStart[0]} ${coordinateStart[1]}`).stroke({ color: '#f06', width: 1, linecap: 'round', linejoin: 'round' })
            }catch(e){}
            
        }
        return shapeIntance;
    }

}

class Brush {
    
    constructor() {
        
    }

    draw(desc: any) {
        console.log(desc.$el)
        if(desc.$el.type === 'rect') {
            this.drawRect(desc)
        } else if (desc.$el.type === 'circle') {
            this.drawCircle(desc)
        } else if (desc.$el.type === "ellipse") {
            this.drawEllipse(desc)
        } else if (desc.$el.type === "line") {
            this.drawLine(desc)
        } else if (desc.$el.type === "path") {
            this.drawPath(desc)
        }
    }

    // 绘制矩形
    drawRect(desc: any) {
        const coordinateStart = desc.coordinateStart
        const coordinate = desc.coordinate
        const dx = coordinate[0] - coordinateStart[0]
        const dy = coordinate[1] - coordinateStart[1]
        // 计算原定坐标
        let originCoordinate = coordinate
        // 判断绘制象限
        if (dx > 0 && dy > 0) {
            // 第一象限
            originCoordinate = coordinateStart
        } else if (dx > 0 && dy < 0) {
            // 第四象限
            originCoordinate = [coordinateStart[0], coordinateStart[1] + dy]
        } else if (dx < 0 && dy > 0) {
            // 第二象限
            originCoordinate = [coordinateStart[0] + dx, coordinateStart[1]]
        } else if (dx < 0 && dy < 0) {
            // 第三象限
            originCoordinate = [coordinateStart[0] + dx, coordinateStart[1] + dy,]
        }
        desc.$el.attr({
            x: originCoordinate[0],
            y: originCoordinate[1],
            fill: 'none',
            stroke: "#f06",
            width: Math.abs(dx),
            height: Math.abs(dy)
        })
    }

    // 绘制圆形
    drawCircle(desc: any) {
        const coordinateStart = desc.coordinateStart
        const coordinate = desc.coordinate
        const dx = coordinate[0] - coordinateStart[0]
        const dy = coordinate[1] - coordinateStart[1]
        desc.$el.attr({
            cx: coordinateStart[0],
            cy: coordinateStart[1],
            r: Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)),
            fill: 'none',
            stroke: "#f06",
        })
    }

    // 绘制椭圆
    drawEllipse(desc: any) {
        const coordinateStart = desc.coordinateStart
        const coordinate = desc.coordinate
        const dx = coordinate[0] - coordinateStart[0]
        const dy = coordinate[1] - coordinateStart[1]
        desc.$el.attr({
            cx: coordinateStart[0],
            cy: coordinateStart[1],
            rx: Math.abs(dx),
            ry: Math.abs(dy),
            fill: 'none',
            stroke: "#f06"
        })
    }

    // 绘制线段
    drawLine(desc: any) {
        const coordinateStart = desc.coordinateStart
        const coordinate = desc.coordinate
     
        desc.$el.attr({
            x1: coordinateStart[0],
            y1: coordinateStart[1],
            x2: coordinate[0],
            y2: coordinate[1],
            stroke: '#f06',
            height: 1,
            width: 1,
            fill: '#f06',
        })
    }

    // 绘制曲线
    drawPath(desc: any) {
        const d = desc.$el.attr().d
        const coordinate = desc.coordinate
        desc.$el.attr({
            d: `${d},${coordinate[0]} ${coordinate[1]}`,
            fill: 'none',
        })
    }
}

export { Draw }