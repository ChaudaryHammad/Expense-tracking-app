import { useCallback, useState } from "react";

export default function usePasswordStrength(){
    const [password,setPassword] = useState('')
    const [strength,setStrength] = useState('Very Weak')

    const checkLength = (password)=>password.length > 6 ? 1:0;
    const checkUpperCase = (password)=> /[A-Z]/.test(password) ? 1:0;
    const checkNumbers = (password)=> /[0-9]/.test(password) ? 1:0;
    const checkSpecialChars = (password) => /[^A-Za-z0-9]/.test(password) ? 1:0

    const checkStrength = useCallback((password)=>{

        let score=0;
        score+=checkLength(password)
        score+=checkNumbers(password)
        score+=checkSpecialChars(password)
        score+=checkUpperCase(password)


        const strengthLevels = ['Very Weak','Weak','Moderate','Strong','Very Strong']

        return strengthLevels[score] || "Very Weak"

        
    },[])

    const handlePasswordChange = (newPassword)=>{
        setPassword(newPassword)

        setStrength(checkStrength(newPassword))

    }

    return{
        password,
        strength,
        handlePasswordChange
    }


}