const CAMERA_OFFSET = 100

window.THREE = require('three')
window.TWEEN = require('./core/tween')
require('./core/BlendCharacter')
import { Clock } from './core/Clock'
import { TextureLoader } from './core/TextureLoader'
import { RoadMgr } from './RoadMgr'
import { Marine } from './Marine'
export class MyAd
{
    constructor (width, height)
    {
        scene = new THREE.Scene()
        scene.add(new THREE.AmbientLight(0xffffff))

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
        renderer.setClearColor(0x777777)
        renderer.setPixelRatio(window.devicePixelRatio)
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.autoClear = true
        document.body.appendChild(renderer.domElement)

        var promises = []
        window.TextureMgr = new TextureLoader()
        let textures =
        {
            atlas: GetEmbedAsset('asset/atlas.png'), 
            sand: GetEmbedAsset('asset/sand.png'), 
            terrain_01_lm: GetEmbedAsset('asset/terrain_01_lm.png'), 
            terrain_02_lm: GetEmbedAsset('asset/terrain_02_lm.png'), 
            terrain_03_lm: GetEmbedAsset('asset/terrain_03_lm.png'), 
            terrain_04_lm: GetEmbedAsset('asset/terrain_04_lm.png'), 
        }
        promises.push(new Promise((resolve, reject) =>
        {
            TextureMgr.Load(textures, resolve)
        }))
        promises.push(new Promise((resolve, reject) =>
        {
            roadmgr = new RoadMgr(scene, 'asset/scene.json', resolve)
        }))
        promises.push(new Promise((resolve, reject) =>
        {
            marine = new Marine(scene, 'asset/marine_anims_core.json', resolve)
        }))
        Promise.all(promises).then(evt =>
        {
            this.Show(width, height)
        })
    }

    Show (width, height)
    {
        let aspect = window.innerWidth / window.innerHeight
        camera = new THREE.PerspectiveCamera(45, aspect, 1, 10000)
        camera.position.set(0, CAMERA_OFFSET * 1.5, CAMERA_OFFSET * 5)
        camera.lookAt(new THREE.Vector3(0, CAMERA_OFFSET, 0))

        roadmgr.Init()
        this.Animate()
    }

    Resize (width, height)
    {
    }

    Animate ()
    {
        requestAnimationFrame(evt =>
        {
            this.Animate()
        }, renderer.domElement)
        var dt = Clock.GetDelta()
        TWEEN.Update(dt)
        roadmgr.Update(dt)
        marine.Update(dt)
        camera.position.set(0, marine.mesh.position.y + CAMERA_OFFSET * 1.5,  marine.mesh.position.z + CAMERA_OFFSET * 5)
        renderer.render(scene, camera)
    }
}

let scene, renderer, camera
window.marine = undefined
let roadmgr = undefined
