"use client";
import React from 'react'
import {Button} from "@/components/ui/button";
import { useState } from "react";
import Image from "next/image";



const ImageTabs = () => {
  const [activeTab, setActiveTab] = useState("organise") // organise, hired, board
  return (
        <section className="border-t bg-white py-16">
            <div className="container mx-auto px-4">
            <div className="mx-auto max-w-6xl ">
                {/* TABS */}
                <div className="flex gap-2 justify-center mb-8">
                
                {/* ORGANISE APPLICATIONS BUTTON */}
                <Button onClick={() => setActiveTab("organise")}
                className={`rounded-lg px-6 py-3 text-sm font-medium transition-colors ${activeTab === "organise" ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                >
                    Organise Applications
                </Button>

                {/* GET HIRED BUTTON */}
                <Button onClick={() => setActiveTab("hired")}
                className={`rounded-lg px-6 py-3 text-sm font-medium transition-colors ${activeTab === "hired" ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                >
                    Get Hired
                </Button>

                {/* MANAGE BOARDS BUTTON */}
                <Button onClick={() => setActiveTab("boards")}
                className={`rounded-lg px-6 py-3 text-sm font-medium transition-colors ${activeTab === "boards" ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                >
                    Manage Boards
                </Button>
                </div>

                <div className="relative mx-auto max-w5xl overflow-hidden rounded-lg border border-gray-200 shadow-xl">
                {/* HERO IMAGES */}
                {activeTab === "organise" && (
                <Image 
                src={"/hero-images/hero1.png"}
                alt="Organise Applications"
                width={1200}
                height={800}
                />
                )}


                    {activeTab === "hired" && (
                <Image 
                src={"/hero-images/hero2.png"}
                alt="Organise Applications"
                width={1200}
                height={800}
                />
                )}

                    {activeTab === "boards" && (
                <Image 
                src={"/hero-images/hero3.png"}
                alt="Organise Applications"
                width={1200}
                height={800}
                />
                )}

                
                </div>
            </div>
            </div>
        </section>
    
  )
}

export default ImageTabs