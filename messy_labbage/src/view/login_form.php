  <form class="form-signin" action="?<?php echo $action; ?>=<?php echo $loginAction; ?>" method="POST">
    <h2 class="form-signin-heading">Log in</h2>
    <input value="" name="<?php echo $userNameKey; ?>" type="text" class="form-control" placeholder="Användarnamn" required autofocus>
    <input value="" name="<?php echo $passwordKey; ?>" type="password" class="form-control" placeholder="Password" required>
    <button class="btn btn-lg btn-primary btn-block" type="submit">Log in</button>
  </form>