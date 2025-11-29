import { motion } from 'motion/react';
import { 
  Camera, 
  Scan, 
  CheckCircle, 
  Shield, 
  Users, 
  Zap,
  Mail,
  Twitter,
  Linkedin,
  Github,
  Sparkles
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LandingPageProps {
  onNavigateToScan: () => void;
}

export function LandingPage({ onNavigateToScan }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#FF8A00] to-[#FFB84D] rounded-full flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                  <circle cx="12" cy="12" r="8" fill="currentColor" opacity="0.9"/>
                  <circle cx="12" cy="12" r="5" fill="white" opacity="0.3"/>
                  <path d="M12 2 L14 6 L12 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="text-xl text-gray-900">D'Jeruk</span>
            </div>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#home" className="text-gray-600 hover:text-[#FF8A00] transition-colors">Home</a>
              <a href="#features" className="text-gray-600 hover:text-[#FF8A00] transition-colors">Features</a>
              <a href="#team" className="text-gray-600 hover:text-[#FF8A00] transition-colors">Team</a>
              <a href="#contact" className="text-gray-600 hover:text-[#FF8A00] transition-colors">Contact</a>
              <button
                onClick={onNavigateToScan}
                className="bg-[#FF8A00] hover:bg-[#e67d00] text-white px-6 py-2.5 rounded-full transition-all hover:shadow-lg"
              >
                Check Your Orange
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl lg:text-6xl text-gray-900 mb-6 leading-tight font-bold">
                Scan Your Orange Quality in <span className="text-[#FF8A00]">Seconds</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                D'Jeruk uses AI and your webcam to classify oranges into High Grade or Low Grade for supermarkets or juice production.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={onNavigateToScan}
                  className="bg-[#FF8A00] hover:bg-[#e67d00] text-white px-8 py-4 rounded-full transition-all hover:shadow-xl flex items-center gap-2"
                >
                  <Scan className="w-5 h-5" />
                  Start Scan
                </button>
                <button className="text-gray-600 hover:text-[#FF8A00] px-8 py-4 transition-colors flex items-center gap-2">
                  Learn how it works →
                </button>
              </div>
            </motion.div>

            {/* Right Illustration - Bouncing/Swaying Oranges */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative h-[500px] flex items-center justify-center"
            >
              {/* Background Glow */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-80 h-80 bg-gradient-to-br from-[#FF8A00]/20 to-[#FFB84D]/20 rounded-full blur-3xl" />
              </div>

              {/* Multiple Oranges with Different Animations */}
              
              {/* Main Center Orange - Bouncing */}
              <motion.div
                animate={{ 
                  y: [0, -30, 0],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute"
                style={{ zIndex: 3 }}
              >
                <motion.div
                  animate={{ 
                    rotate: [0, 5, 0, -5, 0],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-48 h-48 bg-gradient-to-br from-[#FF8A00] to-[#FFB84D] rounded-full relative shadow-2xl"
                >
                  {/* Orange texture */}
                  <div className="absolute inset-0 opacity-20 rounded-full overflow-hidden">
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-0.5 h-full bg-[#e67d00]"
                        style={{
                          left: '50%',
                          transform: `rotate(${i * 30}deg)`,
                          transformOrigin: 'center'
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* Highlight */}
                  <div className="absolute top-4 right-8 w-16 h-16 bg-white rounded-full opacity-40 blur-xl" />
                  
                  {/* Leaf */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                    <motion.div
                      animate={{ rotate: [-10, 10, -10] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      className="w-8 h-10 bg-[#38B87C] rounded-full"
                      style={{ borderRadius: '50% 50% 50% 0%' }}
                    />
                  </div>
                </motion.div>
              </motion.div>

              {/* Small Orange Left - Swaying */}
              <motion.div
                animate={{ 
                  x: [-20, 20, -20],
                  y: [0, -15, 0],
                  rotate: [-5, 5, -5]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute left-8 top-16"
                style={{ zIndex: 2 }}
              >
                <div className="w-24 h-24 bg-gradient-to-br from-[#FFB84D] to-[#FFA366] rounded-full shadow-xl relative">
                  <div className="absolute top-2 right-4 w-8 h-8 bg-white rounded-full opacity-30 blur-md" />
                </div>
              </motion.div>

              {/* Small Orange Right - Falling & Bouncing */}
              <motion.div
                animate={{ 
                  y: [0, 40, 0],
                  x: [0, -15, 0]
                }}
                transition={{ 
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.3
                }}
                className="absolute right-12 top-24"
                style={{ zIndex: 1 }}
              >
                <motion.div
                  animate={{ 
                    rotate: [0, 180, 360]
                  }}
                  transition={{ 
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="w-20 h-20 bg-gradient-to-br from-[#FF8A00] to-[#FFB84D] rounded-full shadow-lg relative"
                >
                  <div className="absolute top-1 right-3 w-6 h-6 bg-white rounded-full opacity-30 blur-sm" />
                </motion.div>
              </motion.div>

              {/* Tiny Orange Bottom - Swaying */}
              <motion.div
                animate={{ 
                  x: [-10, 10, -10],
                  y: [0, 10, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.8
                }}
                className="absolute bottom-20 left-1/3"
                style={{ zIndex: 1 }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#FFA366] to-[#FF8A00] rounded-full shadow-md relative">
                  <div className="absolute top-1 right-2 w-4 h-4 bg-white rounded-full opacity-30 blur-sm" />
                </div>
              </motion.div>

              {/* Decorative Elements */}
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-8 right-8 w-3 h-3 bg-[#38B87C] rounded-full"
              />
              <motion.div
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 0.7, 0.4]
                }}
                transition={{ 
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
                className="absolute bottom-12 right-16 w-2 h-2 bg-[#FFB84D] rounded-full"
              />
              <motion.div
                animate={{ 
                  scale: [1, 1.4, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ 
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute top-1/3 left-12 w-2 h-2 bg-[#38B87C] rounded-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works / Features Section */}
      <section id="features" className="py-24 px-6 bg-gradient-to-b from-white via-[#FFF9F0] to-[#FFF4E6] relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { duration: 30, repeat: Infinity, ease: "linear" },
              scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-[#FF8A00]/10 to-[#FFB84D]/5 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              rotate: -360,
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              rotate: { duration: 25, repeat: Infinity, ease: "linear" },
              scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute -bottom-20 -left-20 w-96 h-96 bg-gradient-to-br from-[#38B87C]/10 to-[#5FD4A0]/5 rounded-full blur-3xl"
          />
          
          {/* Floating Orange Dots */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                y: [0, -30, 0],
                x: [0, i % 2 === 0 ? 20 : -20, 0],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ 
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2
              }}
              className="absolute w-3 h-3 rounded-full"
              style={{
                background: i % 3 === 0 ? '#FF8A00' : i % 3 === 1 ? '#38B87C' : '#FFB84D',
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          {/* Section Title */}
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block mb-4"
            >
              <span className="bg-gradient-to-r from-[#FF8A00] to-[#FFB84D] text-white px-6 py-2 rounded-full text-sm">
                Simple Process
              </span>
            </motion.div>
            <h2 className="text-4xl text-gray-900 mb-4">How D'Jeruk Works</h2>
            <p className="text-lg text-gray-600">Three simple steps to quality detection</p>
          </div>

          {/* Steps with Connecting Line */}
          <div className="relative mb-24">
            {/* Connecting Line - Hidden on mobile */}
            <div className="hidden md:block absolute top-16 left-0 right-0 h-1 bg-gradient-to-r from-[#FF8A00] via-[#FFB84D] to-[#38B87C] opacity-20" 
                 style={{ width: 'calc(100% - 200px)', left: '100px' }} 
            />
            
            <div className="grid md:grid-cols-3 gap-10">
              {[
                {
                  step: '01',
                  title: 'Point your orange at the webcam',
                  description: 'Simply hold your orange in front of your device camera',
                  icon: <Camera className="w-7 h-7" />,
                  color: 'from-[#FF8A00] to-[#FFB84D]',
                  bgPattern: 'from-[#FFF4E6] to-white'
                },
                {
                  step: '02',
                  title: 'AI analyzes the color and texture',
                  description: 'Our advanced AI processes the visual data instantly',
                  icon: <Scan className="w-7 h-7" />,
                  color: 'from-[#FFB84D] to-[#FFA366]',
                  bgPattern: 'from-[#FFF9F0] to-white'
                },
                {
                  step: '03',
                  title: 'Get instant quality result',
                  description: 'Receive grade classification and recommendations',
                  icon: <CheckCircle className="w-7 h-7" />,
                  color: 'from-[#38B87C] to-[#5FD4A0]',
                  bgPattern: 'from-[#E8F5EE] to-white'
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="relative group"
                >
                  <div className={`bg-gradient-to-br ${item.bgPattern} rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100 relative overflow-hidden`}>
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
                        backgroundSize: '20px 20px'
                      }} />
                    </div>
                    
                    <div className="relative z-10">
                      {/* Step Number with Animation */}
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="text-6xl font-bold bg-gradient-to-br from-[#FF8A00] to-[#FFB84D] bg-clip-text text-transparent opacity-20 mb-3"
                      >
                        {item.step}
                      </motion.div>
                      
                      {/* Icon with Glow Effect */}
                      <div className="relative inline-block mb-5">
                        <div className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-xl blur-lg opacity-50 group-hover:opacity-70 transition-opacity`} />
                        <div className={`relative w-14 h-14 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center text-white shadow-lg`}>
                          {item.icon}
                        </div>
                      </div>
                      
                      <h3 className="text-lg text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                      
                      {/* Arrow Indicator */}
                      {index < 2 && (
                        <div className="hidden md:block absolute -right-5 top-1/2 -translate-y-1/2 text-[#FF8A00] opacity-30">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Key Features */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl text-gray-900 mb-2">Key Features</h3>
              <div className="w-20 h-1 bg-gradient-to-r from-[#FF8A00] to-[#38B87C] mx-auto rounded-full" />
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Real-time detection',
                description: 'Instant analysis as you scan',
                icon: <Zap className="w-6 h-6" />,
                color: 'from-[#FF8A00] to-[#FFB84D]',
                bgColor: 'bg-[#FFF4E6]',
                illustration: (
                  <svg className="absolute -bottom-2 -right-2 w-24 h-24 opacity-10" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="currentColor" />
                    <path d="M30 50 L50 30 L70 50 L50 70 Z" fill="white" />
                  </svg>
                )
              },
              {
                title: 'Grade recommendations',
                description: 'Supermarket or juice grade',
                icon: <CheckCircle className="w-6 h-6" />,
                color: 'from-[#38B87C] to-[#5FD4A0]',
                bgColor: 'bg-[#E8F5EE]',
                illustration: (
                  <svg className="absolute -bottom-2 -right-2 w-24 h-24 opacity-10" viewBox="0 0 100 100">
                    <rect x="20" y="30" width="60" height="40" rx="8" fill="currentColor" />
                    <path d="M35 50 L45 60 L65 40" stroke="white" strokeWidth="4" fill="none" />
                  </svg>
                )
              },
              {
                title: 'Easy to use',
                description: 'Perfect for farmers and sellers',
                icon: <Users className="w-6 h-6" />,
                color: 'from-[#FFB84D] to-[#FFA366]',
                bgColor: 'bg-[#FFF9F0]',
                illustration: (
                  <svg className="absolute -bottom-2 -right-2 w-24 h-24 opacity-10" viewBox="0 0 100 100">
                    <circle cx="40" cy="35" r="15" fill="currentColor" />
                    <circle cx="60" cy="35" r="15" fill="currentColor" />
                    <path d="M25 60 Q40 75 50 75 Q60 75 75 60" fill="currentColor" />
                  </svg>
                )
              },
              {
                title: 'Privacy friendly',
                description: 'No images stored',
                icon: <Shield className="w-6 h-6" />,
                color: 'from-[#5FD4A0] to-[#38B87C]',
                bgColor: 'bg-[#E8F5EE]',
                illustration: (
                  <svg className="absolute -bottom-2 -right-2 w-24 h-24 opacity-10" viewBox="0 0 100 100">
                    <path d="M50 20 L70 30 L70 55 Q70 75 50 85 Q30 75 30 55 L30 30 Z" fill="currentColor" />
                    <path d="M40 50 L47 57 L60 44" stroke="white" strokeWidth="3" fill="none" />
                  </svg>
                )
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border border-gray-100 relative overflow-hidden group"
              >
                {/* Background Illustration */}
                <div className="text-gray-900">
                  {feature.illustration}
                </div>
                
                {/* Content */}
                <div className="relative z-10">
                  <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                    {feature.icon}
                  </div>
                  <h4 className="text-base text-gray-900 mb-2">{feature.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-24 px-6 bg-white relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#FF8A00]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#38B87C]/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block mb-4"
            >
              <span className="bg-gradient-to-r from-[#38B87C] to-[#5FD4A0] text-white px-6 py-2 rounded-full text-sm">
                Our Experts
              </span>
            </motion.div>
            <h2 className="text-4xl text-gray-900 mb-4">Meet the Team</h2>
            <p className="text-lg text-gray-600">The experts behind D'Jeruk</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: 'Sarah Chen', role: 'ML Engineer', avatar: 'SC', color: 'from-[#FF8A00] to-[#FFB84D]' },
              { name: 'David Kumar', role: 'Agronomist', avatar: 'DK', color: 'from-[#38B87C] to-[#5FD4A0]' },
              { name: 'Emma Rodriguez', role: 'UI Designer', avatar: 'ER', color: 'from-[#FFB84D] to-[#FFA366]' },
              { name: 'James Park', role: 'Product Manager', avatar: 'JP', color: 'from-[#5FD4A0] to-[#38B87C]' }
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 text-center shadow-md hover:shadow-xl transition-all border border-gray-100 relative overflow-hidden">
                  {/* Decorative Circle */}
                  <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${member.color} opacity-10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500`} />
                  
                  <div className="relative z-10">
                    {/* Avatar with Ring */}
                    <div className="relative inline-block mb-4">
                      <div className={`absolute inset-0 bg-gradient-to-br ${member.color} rounded-full blur-md opacity-50 group-hover:opacity-70 transition-opacity`} />
                      <div className={`relative w-20 h-20 bg-gradient-to-br ${member.color} rounded-full flex items-center justify-center text-white text-xl shadow-lg group-hover:scale-110 transition-transform`}>
                        {member.avatar}
                      </div>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        className={`absolute inset-0 border-2 border-dashed rounded-full opacity-0 group-hover:opacity-30 transition-opacity`}
                        style={{ borderColor: index % 2 === 0 ? '#FF8A00' : '#38B87C' }}
                      />
                    </div>
                    
                    <h3 className="text-base text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-sm text-gray-500 mb-3">{member.role}</p>
                    
                    {/* Social Icons */}
                    <div className="flex gap-2 justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="w-7 h-7 bg-gray-100 hover:bg-[#FF8A00] hover:text-white rounded-full flex items-center justify-center text-xs transition-colors">
                        <Linkedin className="w-3.5 h-3.5" />
                      </button>
                      <button className="w-7 h-7 bg-gray-100 hover:bg-[#38B87C] hover:text-white rounded-full flex items-center justify-center text-xs transition-colors">
                        <Mail className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-gradient-to-br from-[#FFF4E6] via-white to-[#E8F5EE] relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-[#FF8A00]/10 to-transparent rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              scale: [1, 1.3, 1],
              rotate: [0, -90, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-20 left-10 w-72 h-72 bg-gradient-to-br from-[#38B87C]/10 to-transparent rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block mb-4"
            >
              <span className="bg-gradient-to-r from-[#FF8A00] to-[#38B87C] text-white px-6 py-2 rounded-full text-sm">
                Get Started
              </span>
            </motion.div>
            <h2 className="text-4xl text-gray-900 mb-4">Contact & Demo</h2>
            <p className="text-lg text-gray-600">Get in touch to learn more</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Left - Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 relative overflow-hidden">
                {/* Decorative Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle cx="50" cy="50" r="40" fill="#FF8A00" />
                  </svg>
                </div>
                
                <div className="relative z-10">
                  <div className="inline-block p-3 bg-gradient-to-br from-[#FF8A00] to-[#FFB84D] rounded-2xl mb-4">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-2xl text-gray-900 mb-3">Ready to try D'Jeruk?</h3>
                  <p className="text-gray-600 mb-8 leading-relaxed text-sm">
                    Contact us for pilot programs with farms or supermarkets. We're excited to help you improve quality control and reduce waste in the citrus industry.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    <motion.div 
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-4 p-4 bg-gradient-to-r from-[#FFF4E6] to-white rounded-xl border border-orange-100"
                    >
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                        <Mail className="w-5 h-5 text-[#FF8A00]" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Email Address</p>
                        <p className="text-gray-900">hello@djeruk.com</p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-4 p-4 bg-gradient-to-r from-[#E8F5EE] to-white rounded-xl border border-green-100"
                    >
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                        <Sparkles className="w-5 h-5 text-[#38B87C]" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Response Time</p>
                        <p className="text-gray-900">Within 24 hours</p>
                      </div>
                    </motion.div>
                  </div>

                  <div className="pt-6 border-t border-gray-100">
                    <p className="text-sm text-gray-600 mb-4">Connect with us</p>
                    <div className="flex gap-3">
                      <motion.button 
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-11 h-11 bg-gradient-to-br from-[#FF8A00] to-[#FFB84D] text-white rounded-xl flex items-center justify-center shadow-md hover:shadow-lg transition-all"
                      >
                        <Twitter className="w-5 h-5" />
                      </motion.button>
                      <motion.button 
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-11 h-11 bg-gradient-to-br from-[#38B87C] to-[#5FD4A0] text-white rounded-xl flex items-center justify-center shadow-md hover:shadow-lg transition-all"
                      >
                        <Linkedin className="w-5 h-5" />
                      </motion.button>
                      <motion.button 
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-11 h-11 bg-gradient-to-br from-[#FFB84D] to-[#FFA366] text-white rounded-xl flex items-center justify-center shadow-md hover:shadow-lg transition-all"
                      >
                        <Github className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right - Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <form className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2 flex items-center gap-2">
                      <span>Name</span>
                      <span className="text-[#FF8A00]">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Your full name"
                      className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF8A00] focus:border-[#FF8A00] focus:bg-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2 flex items-center gap-2">
                      <span>Email</span>
                      <span className="text-[#FF8A00]">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF8A00] focus:border-[#FF8A00] focus:bg-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Message</label>
                    <textarea
                      placeholder="Tell us about your needs and how we can help..."
                      rows={5}
                      className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF8A00] focus:border-[#FF8A00] focus:bg-white transition-all resize-none"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-[#FF8A00] to-[#FFB84D] hover:from-[#e67d00] hover:to-[#FF8A00] text-white px-6 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    <span>Request Demo</span>
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.button>
                  <p className="text-xs text-gray-500 text-center">
                    We'll respond within 24 hours
                  </p>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-12 px-6 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#FF8A00] rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#38B87C] rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="w-10 h-10 bg-gradient-to-br from-[#FF8A00] to-[#FFB84D] rounded-full flex items-center justify-center shadow-lg"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
                  <circle cx="12" cy="12" r="8" fill="currentColor" opacity="0.9"/>
                  <circle cx="12" cy="12" r="5" fill="white" opacity="0.3"/>
                  <path d="M12 2 L14 6 L12 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </motion.div>
              <div>
                <span className="text-xl">D'Jeruk</span>
                <p className="text-xs text-gray-400">Quality Detection Platform</p>
              </div>
            </div>

            <div className="flex gap-8 text-sm">
              <a href="#" className="text-gray-400 hover:text-[#FF8A00] transition-colors">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-[#FF8A00] transition-colors">Terms</a>
              <a href="#" className="text-gray-400 hover:text-[#FF8A00] transition-colors">Support</a>
            </div>

            <div className="text-center md:text-right">
              <p className="text-sm text-gray-400">© D'Jeruk 2025</p>
              <p className="text-xs text-gray-500">All rights reserved.</p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-700 text-center">
            <p className="text-xs text-gray-500">
              Built with ❤️ for better orange quality control
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
