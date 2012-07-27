#pragma strict

function Update() {
    if (!particleSystem.isPlaying) {
        Destroy(gameObject);
    }
}
