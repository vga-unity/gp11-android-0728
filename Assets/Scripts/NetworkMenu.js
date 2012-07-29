#pragma strict

private var gameID = "edajimaAndroidGame0728";
private var roomID = "Test room";
private var address = "127.0.0.1";

function OnGUI() 
{
	roomID = GUILayout.TextField(roomID);
	
    if (GUILayout.Button("Server")) 
    {
    	//　初期化そて自分をMasterに登録
        Network.InitializeServer(32, 25000, !Network.HavePublicAddress());
        MasterServer.RegisterHost(gameID, roomID);
        Destroy(gameObject);
    }
    
    // MasterServer上の配列を返す
    //MasterServer.PollHostList();
    GUILayout.BeginHorizontal();
    for(var host in MasterServer.PollHostList())
    {  	
    	if(GUILayout.Button(host.gameName))
    	{
    		Network.Connect(host);
    		Destroy(gameObject);
    	}	
    }
    GUILayout.EndHorizontal();
    
    // Masterからhostのリストを取得しなおす
    if(GUILayout.Button("Reload room list"))
    {
    	MasterServer.ClearHostList();
    	MasterServer.RequestHostList(gameID);
    }
}
