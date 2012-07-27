#pragma strict

var speed : float;

function Start() {
    yield WaitForSeconds(1.0);
    Destroy(gameObject);
}

function Update() {
    transform.localPosition += transform.forward * speed * Time.deltaTime;
}
