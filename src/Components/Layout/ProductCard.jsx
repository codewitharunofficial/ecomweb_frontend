import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Chip from '@mui/joy/Chip';
import { Link } from 'react-router-dom';
import Typography from '@mui/joy/Typography';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { useCart } from '../../context/Cart';
import toast from 'react-hot-toast';

export default function ProductCard({image, name, price, category, stock, productLink, product}) {

  const [cart, setCart] = useCart();

  return (
    <Card className="col-md-3 m-2" sx={{maxWidth: '100%', boxShadow: 'lg' }}>
      <CardOverflow>
        <AspectRatio sx={{ minWidth: 200 }}>
          <img
            src={image}
            srcSet={image}
            loading="lazy"
            alt=""
            style={{objectFit: 'contain'}}
          />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        {/* <Typography level="body-xs">{category}</Typography> */}
        <Link
          to={productLink}
          fontWeight="md"
          color="neutral"
          textColor="text.primary"
          overlay
          endDecorator={<ArrowOutwardIcon />}
        >
          {name}
        </Link>

        <Typography
          level="title-lg"
          sx={{ mt: 1, fontWeight: 'xl' }}
          endDecorator={
            <Chip component="span" size="sm" variant="soft" color="success">
              {Math.floor((price * 9)/10)}
            </Chip>
          }
        >
          {price}
        </Typography>
        <Typography level="body-sm">
          (Only <b>{stock}</b> left in stock!)
        </Typography>
      </CardContent>
      <CardOverflow>
        <Button onClick={() => {setCart([...cart, product]); toast.success('Item Added To Cart'); localStorage.setItem('cart', JSON.stringify([...cart, product]))}} variant="solid" color="danger" size="lg">
          Add to cart
        </Button>
      </CardOverflow>
    </Card>
  );
}