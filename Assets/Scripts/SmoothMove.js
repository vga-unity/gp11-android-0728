#pragma strict

var targetPosition : Vector3;
var targetRotation : Quaternion;

private var velocity : Vector3;

function Update () {
	transform.position =
		Vector3.SmoothDamp(transform.position, targetPosition, velocity, 0.2);
	transform.rotation =
		Quaternion.RotateTowards(transform.rotation, targetRotation, 300.0 * Time.deltaTime);
}

function OnSerializeNetworkView(stream : BitStream, info : NetworkMessageInfo) {
	var position : Vector3;
	var rotation : Quaternion;
	if (stream.isWriting) {
		position = targetPosition;
		rotation = targetRotation;
		stream.Serialize(position);
		stream.Serialize(rotation);
	} else {
		stream.Serialize(position);
		stream.Serialize(rotation);
		targetPosition = position;
		targetRotation = rotation;
	}
}
