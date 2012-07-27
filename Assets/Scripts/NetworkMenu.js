#pragma strict

private var gameID = "GP11Android0728";
private var roomID = "Test room";

function Awake() {
    MasterServer.RequestHostList(gameID);
}

function OnGUI() {
    roomID = GUILayout.TextField(roomID);
    
    if (GUILayout.Button("Make server")) {
        Network.InitializeServer(32, 25000, !Network.HavePublicAddress());
        MasterServer.RegisterHost(gameID, roomID);
        Destroy(gameObject);
    }

    for (var host in MasterServer.PollHostList()) {
        GUILayout.BeginHorizontal();
        if (GUILayout.Button(host.gameName)) {
            Network.Connect(host);
            Destroy(gameObject);
        }
        GUILayout.EndHorizontal();
    }

    if (GUILayout.Button("Reload the room list")) {
        MasterServer.ClearHostList();
        MasterServer.RequestHostList(gameID);
    }
}
