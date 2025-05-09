import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '@/components/ui/input';

const Home = () =>
{
    return (
        <>
            <h2>Welcome to my Home page</h2>
            <Button variant="link">Click me</Button>
            <Link to="/about">Go to about page</Link>


            <Input placeholder="Type here..." className="w-full" />
        </>
    )
}

export default Home;