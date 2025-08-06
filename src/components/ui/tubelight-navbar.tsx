"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Link, useLocation } from "react-router-dom"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
  isScrollTarget?: boolean // For homepage sections
}

interface NavBarProps {
  items: NavItem[]
  className?: string
  onNavClick?: (name: string) => void
}

export function TubelightNavBar({ items, className, onNavClick }: NavBarProps) {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState(items[0].name)
  const [isMobile, setIsMobile] = useState(false)

  // Determine active tab based on current location
  useEffect(() => {
    const currentItem = items.find(item => {
      if (item.url === '/') return location.pathname === '/'
      return location.pathname === item.url
    })
    if (currentItem) {
      setActiveTab(currentItem.name)
    }
  }, [location.pathname, items])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleItemClick = (item: NavItem) => {
    setActiveTab(item.name)
    if (onNavClick) {
      onNavClick(item.name)
    }
  }

  return (
    <div
      className={cn(
        "flex items-center",
        className,
      )}
    >
      <div className="relative flex items-center gap-1 bg-background/80 border border-border backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          const content = (
            <>
              <span className="hidden md:flex items-center">
                <Icon size={16} className="mr-1.5" />
                {item.name}
              </span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-foreground rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                >
                  {/* Glowing light effect on top */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                    <div className="absolute w-12 h-6 bg-primary/30 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-primary/40 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-primary/50 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </>
          )

          return item.isScrollTarget && location.pathname === '/' ? (
            <button
              key={item.name}
              onClick={() => handleItemClick(item)}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-4 py-2 rounded-full transition-colors z-10",
                "text-muted-foreground hover:text-foreground",
                isActive && "text-background",
              )}
            >
              {content}
            </button>
          ) : (
            <Link
              key={item.name}
              to={item.url}
              onClick={() => handleItemClick(item)}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-4 py-2 rounded-full transition-colors z-10",
                "text-muted-foreground hover:text-foreground",
                isActive && "text-background",
              )}
            >
              {content}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
