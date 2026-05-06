// Total zoom layers including the manifesto layer (Layer 0).
export const NUM_LAYERS = 6;

// Each layer occupies this many viewport heights of scroll. Bigger = more dwell.
export const LAYER_VH = 140;

// Scale ratio between consecutive layers. The deeper layer is at scale = 1/ZOOM
// when its parent is at scale 1; at distance=0 it reaches scale 1.
export const ZOOM = 6;

// Bell-curve half-width in "layers" units. Larger = each layer is visible for
// longer (=> more dwell + more text-reading time).
export const VISIBLE_HALF_WIDTH = 0.95;
