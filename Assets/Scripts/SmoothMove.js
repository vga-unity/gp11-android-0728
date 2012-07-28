#pragma strict

var TargetPosition : Vector3;
var TargetRotation : Quaternion = Quaternion.identity;
private var velocity : Vector3;

function Update()
{
	transform.position = Vector3.SmoothDamp(transform.position, TargetPosition, velocity, 0.2);
	transform.rotation = Quaternion.RotateTowards(transform.rotation, TargetRotation, 300.0 * Time.deltaTime);
}

function OnSerializeNetworkView(stream : BitStream, info : NetworkMessageInfo)
{
	var position : Vector3;
	var rotation : Quaternion;
	
	if (stream.isWriting)
	{
		position = TargetPosition;
		rotation = TargetRotation;
		stream.Serialize(position);
		stream.Serialize(rotation);
	}
	else
	{
		stream.Serialize(position);
		stream.Serialize(rotation);
		TargetPosition = position;
		TargetRotation = rotation;
	}
}