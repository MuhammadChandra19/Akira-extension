import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  return (
    <div className="content">
      <h1 className="mb-4 mt-8">HEY!!</h1>
      <h2>Welcome to Akira Web3 Wallet Extension</h2>
      <div className="my-8 flex flex-col gap-4">
        <Button 
          variant="outline"
          onClick={() => navigate("/create-account")}
        >
          Create A Wallet
        </Button>
        <Button  onClick={() => navigate("/recover")}>Sign In With Seed Phrase</Button>
      </div>
    </div>
  )
}

export default Home