#pragma strict

var speed : float;
var bulletPrefab : GameObject;
var damageFxPrefab : GameObject;
private var velocity : Vector3;
private var Life : int = 100;

function Update () {
    //var move = Vector3(Input.GetAxis("Horizontal"), 0.0, Input.GetAxis("Vertical"));
    var move = transform.right * Input.GetAxis("Horizontal") + transform.forward * Input.GetAxis("Vertical");
    
    var smoothMove = GetComponent.<SmoothMove>();
    smoothMove.TargetPosition += move * speed * Time.deltaTime;
    
    var yaw = 300.0 * Input.GetAxis("Mouse X") * Time.deltaTime;
    smoothMove.TargetRotation = Quaternion.AngleAxis(yaw, Vector3.up) * smoothMove.TargetRotation;
    
    //var pitch = 300.0 * Input.GetAxis("Mouse Y") * Time.deltaTime;
    //smoothMove.TargetRotation = Quaternion.AngleAxis(pitch, Vector3.left) * smoothMove.TargetRotation;
    
    //if (move.magnitude > 0.1)
    //{
    //	smoothMove.TargetRotation.SetLookRotation(move);
    	//transform.LookAt(transform.position + move);
    //}
        
    var bulletPosition;
    
    if (Input.GetButtonDown("Fire1"))
    {
        bulletPosition = transform.position + Vector3.up * 0.5 + transform.forward * 0.3;
        Network.Instantiate(bulletPrefab, bulletPosition, transform.rotation, 0);
    }
    
    if (Input.GetButtonDown("Fire2"))
    {
    	for (var i = 0; i < 10; i++)
    	{
        	bulletPosition = transform.position + Vector3.up * Random.Range(-1, 1) +
        	Vector3.right * Random.Range(-1, 1) + Vector3.left * Random.Range(-1, 1) +
        	transform.forward * 0.3;
        	Network.Instantiate(bulletPrefab, bulletPosition, transform.rotation, 0);
        }
    }
    
    if (Input.GetButtonDown("Jamp"))
    {
    	velocity.y = 10;
    	smoothMove.TargetPosition.y = velocity.y;
    }
    else
    {
    	velocity.y = 0;
    	smoothMove.TargetPosition.y = velocity.y;
    }
}

function OnTriggerEnter(collider : Collider)
{
    if (collider.gameObject.tag == "Bullet")
    {
        var fxPosition = transform.position + Vector3.up * 0.5;
        Network.Instantiate(damageFxPrefab, fxPosition, transform.rotation, 0);
        Life--;
        
        if (Life <= 0) Destroy(gameObject);
    }
}

function OnGUI() {
    if (GUILayout.Button("Color change")) {
        networkView.RPC("ChangeColor", RPCMode.All, Random.value, Random.value, Random.value);
    }
}

@RPC
function ChangeColor(r : float, g : float, b : float) {
    GetComponentInChildren.<Renderer>().material.color = Color(r, g, b);
}
