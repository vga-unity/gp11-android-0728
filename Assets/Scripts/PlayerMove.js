#pragma strict

var speed : float;
var bulletPrefab : GameObject;
var damageFxPrefab : GameObject;
var life : int = 10;
var skin : GUISkin;

function Update () 
{
	if(life > 0)
	{
		// キーの入力情報から移動速度を求める
	    //var move = Vector3(Input.GetAxis("Horizontal"), 0.0, Input.GetAxis("Vertical"));
	    var move =
	    	transform.right * Input.GetAxis("Horizontal") +
	    	transform.forward * Input.GetAxis("Vertical");
	    
	    var smoothMove = GetComponent.<SmoothMove>();
	    smoothMove.targetPosition += move * speed * Time.deltaTime;
	    
		var yaw = 300.0 * Input.GetAxis("Mouse X") * Time.deltaTime;
		smoothMove.targetRotation =
			Quaternion.AngleAxis(yaw, Vector3.up) * smoothMove.targetRotation;
		      
	    if (Input.GetButtonDown("Fire1")) 
	    {
	        var bulletPosition = transform.position + Vector3.up * 0.5 + transform.forward * 0.3;
	        for(var i=0; i < 5; i++)
	        {
	        	Network.Instantiate(bulletPrefab, bulletPosition, transform.rotation, 0);
	        }
	    }
	}
}

// 当たり判定
function OnTriggerEnter(collider : Collider) 
{
    if (collider.gameObject.tag == "Bullet") 
    {
    	Destroy(collider.gameObject);
    	
        var fxPosition = transform.position + Vector3.up * 0.5;
        Network.Instantiate(damageFxPrefab, fxPosition, transform.rotation, 0);
        life--;
    }
}

// 色を変える
function OnGUI() 
{
	var sw = Screen.width;
	var sh = Screen.height;
	GUI.skin = skin;
	
    if (GUILayout.Button("Color change")) 
    {
        networkView.RPC("ChangeColor", RPCMode.All, Random.value, Random.value, Random.value);
    }
    if(life > 0)
    {
    	GUI.Label(Rect(0.8 * sw, 0.1 * sh, 0.2 * sw, 0.1 * sh), "LIFE:" + life, "BIG");
    }
    else
    {
    	if(GUI.Button(Rect(0.4 * sw, 0.4 * sh, 0.2 * sw, 0.2 * sh), "Retry Game!", "BIG"))
    	{
    		transform.position = Vector3(0, 1, 0);
    		life = 10;
    	}
    }
}
@RPC
function ChangeColor(r : float, g : float, b : float) 
{
    GetComponentInChildren.<Renderer>().material.color = Color(r, g, b);
}
