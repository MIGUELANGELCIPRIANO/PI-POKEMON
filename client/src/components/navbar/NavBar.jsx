import Button from "../button/Button";

const NavBar = () => {
  return (
    <nav>
        <Button path='/home' text='Home'></Button>
        <Button path='/form' text='Create'></Button>
        <Button path='/' text='Logout'></Button>
    </nav>
  );
}

export default NavBar;