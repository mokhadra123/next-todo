import { Inter, Poppins, Rubik } from "next/font/google";

export const rubikSans = Rubik({
    variable:"--font-rubik-sans",
    subsets: ["arabic"],
    weight: ["400", "500"]
});

export const poppinsSans = Poppins({
    variable: "--font-poppins-sans",
    subsets: ["latin"],
    weight: ["400"]
})

export const interSans = Inter({
    variable: "--font-inter-sans",
    subsets: ["latin"],
    weight: ["400"]
})