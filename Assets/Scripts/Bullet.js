#pragma strict

var speed : float;


function Start() {
    yield WaitForSeconds(1.0);
    Destroy(gameObject);
}

function Update() {

	transform.localPosition.x +=
    	transform.right.x * Random.Range(-6.0, 6.0) * Time.deltaTime;
    	
    transform.localPosition.y +=
    	transform.up.y * Random.Range(-2.0, 2.0) * Time.deltaTime;
    	
    transform.localPosition += transform.forward * speed * Time.deltaTime;
}
