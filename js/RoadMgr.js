const MAX_SEGMENT_NUMBER = 20

import { Scene3D } from './Scene3D'
export class RoadMgr
{
    constructor (container, model, resolve)
    {
        this.parent = container
        GameData = new Scene3D(model)
        $(GameData).on('loaded', evt =>
        {
            resolve && resolve()
        })
    }

    Init ()
    {
        TextureMgr.Get('sand').wrapS = THREE.RepeatWrapping
        TextureMgr.Get('sand').wrapT = THREE.RepeatWrapping

        for (let i = 1; i <= 4; i++)
        {
            GameData.GetObjectByPath(`Scene/road_0${i}/road/terrain`).material.setValues(
            {
                map: TextureMgr.Get('sand'),
                lightMap: TextureMgr.Get(`terrain_0${i}_lm`),
                wireframe: false,
            })
            GameData.GetObjectByPath(`Scene/road_0${i}/road/props`).material.setValues(
            {
                map: TextureMgr.Get('atlas'),
                transparent: true,
                alphaTest: 0.1,
                side: THREE.DoubleSide,
            })

            let curve = new THREE.CatmullRomCurve3([])
            let points = GameData.GetObjectByPath(`Scene/road_0${i}/point`).children
            for (let i = 0; i < points.length; i++)
            {
                curve.points.push(points[i].position)
            }
            curve.updateArcLengths()
            let segment = 
            {
                model: GameData.GetObjectByPath(`Scene/road_0${i}/road`),
                curve: curve,
            }
            RoadSegments.push(segment)
        }
        this.parent.add(RoadSegments[0].model)
    }

    Update (dt)
    {
        distance += speed * dt
        let currentlCurve = RoadSegments[0].curve
        if(distance < currentlCurve.getLength())
        {
            let anchor = currentlCurve.getPointAt(distance/ currentlCurve.getLength())
            marine.mesh.position.set(anchor.x, anchor.y, anchor.z)
        }
    }
}

window.GameData = undefined
window.RoadSegments = []

let speed = 100
let distance = 0 