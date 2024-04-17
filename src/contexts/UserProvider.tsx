import { userService } from "@/service/user/userService"
import React, { type ReactElement, createContext, useEffect } from "react"
import { createSession, deleteSession, getSession } from "../../lib"
import { UserRole, type UserI } from "@/models/user.model"
import { notification } from "antd"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import firebase from "@/firebase/config"
import { axiosInstance } from "@/service/config"
import { adminService } from "@/service/admin/adminService"
import { useAppDispatch } from "@/redux/hooks"
import { saveUser } from "@/redux/slices/user"
import { saveJwt } from "@/redux/slices/auth"
// Create a context
const AppContext = createContext({})

export const getUserData = async (id: string): Promise<UserI> => {
  const result = await userService.getUser(id)
  return result.user
}
export const getAdminData = async (id: string): Promise<UserI> => {
  const result = await adminService.getUser(id)
  return result.user
}

export const handleGetUserData = async (
  id: string,
  userRole: UserRole,
): Promise<UserI> => {
  if (userRole === UserRole.admin) {
    return await getAdminData(id)
  } else {
    return await getUserData(id)
  }
}

export const login = async (data: {
  email: string
  password: string
  role: UserRole
}): Promise<{ jwt: string; user: UserI } | undefined> => {
  try {
    const { email, password, role } = data
    const auth = getAuth(firebase)
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    )
    const idToken = await userCredential.user.getIdToken()
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${idToken}`
    const result = await handleGetUserData(userCredential.user.uid, role)
    await createSession({
      jwt: idToken,
      userRole: role,
      expiration: new Date(Date.now() + 1000 * 60 * 60 * 24),
      id: userCredential.user.uid,
    })
    return {
      jwt: idToken,
      user: result,
    }
  } catch (error) {
    notification.error({
      message: "Error",
      description: "An error occurred while logging in",
    })
    throw new Error((error as Error).message)
  }
}

export const logout = async (): Promise<void> => {
  try {
    await deleteSession()
    axiosInstance.defaults.headers.common.Authorization = ""
  } catch (error) {
    notification.error({
      message: "Error",
      description: "An error occurred while logging out",
    })
  }
}

const checkCookiesData = async (): Promise<{
  user: UserI
  jwt: string
  expiration: Date
} | null> => {
  try {
    const session = await getSession()
    if (!session) {
      throw new Error("No session found")
    }
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${session.jwt}`
    const user = await handleGetUserData(session.id, session.userRole)
    return {
      user,
      jwt: session.jwt,
      expiration: session.expiration,
    }
  } catch (error) {
    notification.error({
      message: "Error",
      description: "An error occurred while checking the session",
    })
    return null
  }
}

export function UserProvider({
  children,
}: {
  children: ReactElement
}): JSX.Element {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const result = await checkCookiesData()
      if (result) {
        dispatch(saveUser({ user: result.user }))
        dispatch(saveJwt({ jwt: result.jwt }))
      }
    }

    void fetchData()
  }, [])

  return (
    <AppContext.Provider
      value={{
        getUserData,
        login,
        logout,
        getAdminData,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
