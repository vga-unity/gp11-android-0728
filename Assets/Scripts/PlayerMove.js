#pragma strict

var speed : float;
var bulletPrefab : GameObject;
var damageFxPrefab : GameObject;
private final var MAX_ANGLE : float = 300.0;
private final var MAX_BULLET_NUM : int = 100;

function Update () {
    //var move = Vector3(Input.GetAxis("Horizontal"), 0.0, Input.GetAxis("Vertical"));
    //transform.localPosition += move * speed * Time.deltaTime;
    
    //if (move.magnitude > 0.1) transform.LookAt(transform.position + move);
    //if (move.magnitude > 0.1){
    //	smoothMove.TargetRotation.SetLookRotation(move);
    //}
    var move = transform.right * Input.GetAxis("Horizontal") + transform.forward * Input.GetAxis("Vertical");
    
    if(Input.GetButton("Jump")){
    	move += Vector3(0.0, 1.0, 0.0);
    }
    
    var smoothMove = GetComponent.<SmoothMove>();
    smoothMove.TargetPosition += move * speed * Time.deltaTime;
    
    var Yaw = MAX_ANGLE * Input.GetAxis("Mouse X") * Time.deltaTime;
    smoothMove.TargetRotation = Quaternion.AngleAxis(Yaw, Vector3.up) * smoothMove.TargetRotation;
    
    if (Input.GetButtonDown("Fire1")) {
    	for(var i = 0; i < MAX_BULLET_NUM; i++){
	        var bulletPosition = transform.position + Vector3.up * 0.5 + transform.forward * 0.3 + Vector3(Random.RandomRange(-0.5, 0.5), Random.RandomRange(-0.5, 0.0), Random.RandomRange(-0.5, 0.5));
	        Network.Instantiate(bulletPrefab, bulletPosition, transform.rotation, 0);
        }
    }
    
    if (Input.GetButtonDown("Fire2")) {
    	for(var j = 0; j < MAX_BULLET_NUM; j++){
	        var bulletPosition2 = transform.position + Vector3.up * 0.5 + transform.forward * 0.3 + Vector3(Mathf.Sin(0.5 * j), Mathf.Cos(0.5 * j), Mathf.Sin(0.5 * j));
	        Network.Instantiate(bulletPrefab, bulletPosition2, transform.rotation, 0);
        }
    }
}

function OnTriggerEnter(collider : Collider) {
    if (collider.gameObject.tag == "Bullet") {
        var fxPosition = transform.position + Vector3.up * 0.5;
        Network.Instantiate(damageFxPrefab, fxPosition, transform.rotation, 0);
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
