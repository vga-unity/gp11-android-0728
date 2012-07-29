#pragma strict

public var TargetPosition : Vector3;
public var TargetRotation : Quaternion;
private var Velocity : Vector3;
private final var LINER : float = 0.2;
private final var ANGLE : float = 300.0;

function Start () {
	TargetRotation = Quaternion.identity;
}

function Update () {
	transform.position = Vector3.SmoothDamp(transform.position, TargetPosition, Velocity, LINER);
	transform.rotation = Quaternion.RotateTowards(transform.rotation, TargetRotation, ANGLE * Time.deltaTime);
}

function OnSerializeNetworkView(stream : BitStream, info : NetworkMessageInfo){
	var position : Vector3;
	var rotation : Quaternion;
	rotation = Quaternion.identity;
	
	//情報の送信処理か受信処理かの判定
	if(stream.isWriting){
		position = TargetPosition;
		rotation = TargetRotation;
		//情報送信
		stream.Serialize(position);
		stream.Serialize(rotation);
	}else{
		//情報受信時にはpositionにデータが入るようになる
		stream.Serialize(position);
		stream.Serialize(rotation);
		TargetPosition = position;
		TargetRotation = rotation;
	}
}