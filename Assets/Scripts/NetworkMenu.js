#pragma strict

private var gameID = "KazuyukiAndroidGame0728";
private var roomID = "Test Room";
private var address = "127.0.0.1";

function OnGUI() {
	roomID = GUILayout.TextField(roomID);

    if (GUILayout.Button("Server")) {
        Network.InitializeServer(32, 25000, !Network.HavePublicAddress());
        MasterServer.RegisterHost(gameID, roomID);
        Destroy(gameObject);
    }
    
    GUILayout.BeginHorizontal();
    for(var host in MasterServer.PollHostList()){
    	if(GUILayout.Button(host.gameName)){
    		Network.Connect(host);
    		Destroy(gameObject);
    	}
    }
    GUILayout.EndHorizontal();
    
    if(GUILayout.Button("Reload Room List")){
    	MasterServer.ClearHostList();
    	MasterServer.RequestHostList(gameID);
    }
}
