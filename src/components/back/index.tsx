import { useNavigate } from "react-router-dom"
import Button from '@mui/material/Button';

const Back =() => {
    const navigate = useNavigate()

    return (
        <>
            <Button type="submit"
                    //style={{margin: '2em'}}
                    variant="contained" onClick={()=>{
                        navigate(-1)
                    }}>
                Back
            </Button>
        </>
    )
}
export default Back