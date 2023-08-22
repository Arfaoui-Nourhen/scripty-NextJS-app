"use client"
import Link from 'next/link'
import Image from 'next/image'
import {useState, useEffect} from 'react'
import {signIn,signOut,useSession,getProviders} from  'next-auth/react'

const Nav = () => {
  const {data:session}=useSession();
  const [toggleDropDownMenu, setToggleDropDownMenu] = useState(false)
  const [providers, setProviders] = useState(null)
 
  useEffect(() => {
    const ManageProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    ManageProviders();
  }, []);
  
  return (
    <nav className='w-full  flex-between  mb-16 pt-3 '>
      <Link href={'/'}  className='flex gap-2 flex-center'>
        <Image loading='lazy' src={`/assets/images/logo.svg`}  className='object-contain' alt='Scripty logo' width={30} height={30} />
       <p className='logo_text'>Scripty</p> 
      </Link>

      {/* Large screen feature navigation */}
      <div className='sm:flex hidden'>
        { 
          session?.user ? (
            <div className='flex gap-3 md:gap-5'>
              <Link           
                href={'/create-prompt'} 
                className='black_btn'>
                 Create Prompt</Link>
              <button
                type='button'
                className='outline_btn'
                onClick={()=> signOut() } >Sign Out</button>
              <Link  href={'/profile'} > 
                <Image  src={session?.user.image} alt='profile-picture' width={37} height={37} className='rounded-full'/>
              </Link>
            </div>
          ):(
            <div>
              { providers && Object.values(providers).map(
                (provider)=>(
                  <button type='button' className='black_btn' key={provider.name} 
                  onClick={()=>{signIn(provider.id)}}>Sign In</button>
              ))}
            </div>
          )
        }
      </div>

      {/* Mobile feature navigation */}
      <div className='sm:hidden flex relative'>
        {
          session?.user ? (
            <div className=' flex flex-col'>
                <Image  
                  src={session?.user.image} 
                  alt='profile-picture' 
                  width={37} height={37} 
                  className='rounded-full'  
                  loading='lazy'
                  onClick={()=>setToggleDropDownMenu(!toggleDropDownMenu) //recommanded solution 
                }/>
                {toggleDropDownMenu && <div className='dropdown shadow-xl'>
                <Link 
                  href={`/profile`} 
                  className='dropdown_link'  
                  onClick={()=>{setToggleDropDownMenu(false)  
                }}>My Profile</Link>
                  <Link 
                  href={`/create-prompt`} 
                  className='dropdown_link'  
                  onClick={()=>{setToggleDropDownMenu(false)  
                }}>Create Prompt</Link>
                 <hr class="w-full h-1 mt-5 bg-gray-200 border-0 rounded dark:bg-gray-700"/>
                <button
                 type='button'
                 className='w-full  black_btn'  
                 onClick={() => {
                  setToggleDropDownMenu(false);
                  signOut();
                }}
                >
                Sign Out
                </button>
                </div> }
            </div>
          ):(
            <div>
              { providers && Object.values(providers).map(
                (provider)=>(
                  <button type='button' className='black_btn' key={provider.name}  onClick={() => {
                    signIn(provider.id);
                  }}>Sign In</button>
              ))}
            </div>
          )
        }
      </div>

    </nav>
  )
}

export default Nav