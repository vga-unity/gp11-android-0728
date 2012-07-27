#pragma strict

var speed : float;
var bulletPrefab : GameObject;
var damageFxPrefab : GameObject;

function Update () {
    var move = Vector3(Input.GetAxis("Horizontal"), 0.0, Input.GetAxis("Vertical"));
    transform.localPosition += move * speed * Time.deltaTime;
    
    if (move.magnitude > 0.1) transform.LookAt(transform.position + move);
        
    if (Input.GetButtonDown("Jump")) {
        var bulletPosition = transform.position + Vector3.up * 0.5 + transform.forward * 0.3;
        Network.Instantiate(bulletPrefab, bulletPosition, transform.rotation, 0);
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
