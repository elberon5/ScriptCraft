load(__folder + "drone.js");
//
// constructs a tower with steps
//
Drone.extend('tower', function(floors, side) {
  var floorHeight = 4;

  if (typeof side == "undefined")
    side = 6;
  if (typeof floors == "undefined")
    floors = 1;

  if (floors < 1 || side < 6)
    throw new java.lang.RuntimeException("Tower must be at least 6 wide and have 1 floor");

  var brick = 98, window = 102;
  var ladder = '65:' + Drone.PLAYER_SIGN_FACING[(this.dir)];
  var torch = '50:' + Drone.PLAYER_TORCH_FACING[this.dir];

  // remove what's there
  this.box(0, side, 40, side);

  // build 1st floor
  this.chkpt('tower').box(brick, side, 1, side);
  // build walls
  this.move('tower').up(1).box0(brick, side, floorHeight, side);
  // doorway
  this.move('tower').up(1).right(1).box(0, 1, 2, 1);
  // 1st ceiling
  this.move('tower').up(floorHeight + 1).box(brick, side, 1, side);
  // torch
  this.move('tower').up(1).right(1).door() // double doors
    .back().left().up().box(torch) // left torch
    .right(2).box(torch); // right torch
  // window

  for(x = 1;x < floors; x++)  {
    // floor is the previous ceiling, make a hole for the steps
    this.move('tower').up(5 * x).fwd(side-2).right(1)
      .box(0);
    // walls
    this.move('tower').up(5 * x).up(1)
      .box0(brick, side, floorHeight, side);
    // ceiling
    this.move('tower').up(5 * x).up(5)
      .box(brick, side, 1, side);
    // add a ladder
    this.move('tower').right(1).up(5 * (x-1)).up(1).fwd(side - 2) // move inside tower
      .box(ladder, 1,(floors * floorHeight)-3,1);
    // add a torch on each floor
    this.move('tower').up(5 * x).fwd(side-2).right(2).up(3)
      .box(torch);
  }
});
