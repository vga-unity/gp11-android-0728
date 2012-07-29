#pragma strict

var playerPrefab : GameObject;

function OnGUI() 
{
    if (Network.connections.Length > 0)
    {
        if (GUILayout.Button("Join the game"))
        {
            var cubeman = Network.Instantiate(playerPrefab, transform.position, transform.rotation, 0);
            cubeman.GetComponent.<PlayerMove>().enabled = true;
            cubeman.GetComponentInChildren.<Camera>().enabled = true;
            Destroy(gameObject);
        }
    }
}
