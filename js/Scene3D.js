export class Scene3D
{
    constructor (model)
    {
        this.m_scene = null
        this.m_objects = {}
        this.m_objectPaths = {}

        this.m_loader = new THREE.ObjectLoader()
        this.m_loader.load(model, result =>
        {
            this.m_scene = result
            this.AddSceneObject(result)
            $(this).trigger('loaded')
        })
    }

    AddSceneObject (object)
    {
        var objs = [object]
        while (objs.length)
        {
            var obj = objs.pop()
            if (obj.parent)
            {
                obj.path = obj.parent.path.slice(0)
                obj.path.push(obj.name)
            } else
            {
                obj.path = [obj.name]
            }
            var path = obj.path.join('/')
            this.m_objects[obj.uuid] = obj
            this.m_objectPaths[path] = obj
            if (obj.children && obj.children.length)
            {
                for (var i = 0; i < obj.children.length; i++)
                {
                    objs.push(obj.children[i])
                }
            }
        }
    };

    GetObjectByPath (path)
    {
        return this.m_objectPaths[path] || null
    };

    GetRootObject ()
    {
        return this.m_scene
    }
}
