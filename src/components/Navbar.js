import { Navbar as BootstrapNavbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";

export function Navbar() {
  const { openCart, cartQuantity } = useShoppingCart();

  return (
    <BootstrapNavbar sticky="top" className="bg-white shadow-sm" expand="lg" style={{ width: '100%' }}>
      <Container fluid style={{ padding: '0 1rem', maxWidth: '100%' }}>
        <BootstrapNavbar.Brand 
          as={Link} 
          to="/home"
          className="me-4 fw-bold"
          style={{ minWidth: '120px' }} /* Largeur fixe pour le titre */
        >
          Mon Application
        </BootstrapNavbar.Brand>

        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto" style={{ gap: '1rem' }}> {/* Espacement entre les liens */}
            <Nav.Link as={Link} to="/home" className="px-2">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/store" className="px-2">
              Store
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className="px-2">
              About
            </Nav.Link>
          </Nav>

          <div style={{ minWidth: '120px', display: 'flex', justifyContent: 'flex-end' }}>
            {cartQuantity > 0 && (
              <Button
                onClick={openCart}
                variant="outline-primary"
                className="rounded-circle p-0"
                style={{ 
                  width: "2.5rem", 
                  height: "2.5rem",
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                🛒
                <div className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
                  style={{
                    color: "white",
                    width: "1.3rem",
                    height: "1.3rem",
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    transform: "translate(25%, 25%)",
                    fontSize: '0.75rem'
                  }}
                >
                  {cartQuantity}
                </div>
              </Button>
            )}
          </div>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}
export default Navbar;