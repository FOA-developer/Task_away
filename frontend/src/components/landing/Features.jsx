import { Tag, Calendar, ShieldCheck, Clock, Layers, UserCircle } from 'lucide-react';

const Features = () => {
  const boxes = [
    {
      icon: Calendar,
      title: "Calendar View",
      description: "Click any date to reveal all tasks due that day in a smooth side drawer."
    },
    {
      icon: Tag,
      title: "Smart Tags",
      description: "Filter tasks by status: Pending, In Review, Done, Finished with beautiful color coding."
    },
    {
      icon: ShieldCheck,
      title: "Role-Based Tasks",
      description: "Tasks are grouped by team roles. Everyone sees what's relevant to them."
    },
    {
      icon: Layers,
      title: "Multiple Workspaces",
      description: "Switch between workspaces from a unified hub. Perfect for juggling multiple projects."
    },
    {
      icon: UserCircle,
      title: "Personalized Profile",
      description: "Set your avatar, username, and role from your profile card."
    },
    {
      icon: Clock,
      title: "Deadline Alerts",
      description: "Overdue and upcoming tasks surface automatically with gentle highlights."
    }
  ]

  return (
    <div className="bg-[#FAF8F2]">
      <section id="features" className="pt-32 pb-8">
        <div className="flex  flex-col justify-between gap-3 items-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-semibold text-primary text-center">Everything you need, nothing you don't</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:gap-12 mx-auto py-10">
            {
              boxes.map((box, index) => {
                const Icon = box.icon
                return (
                <div key={index} className="shadow-md rounded-xl p-4 border border-secondary gap-2 flex flex-col bg-primary"> 
                  <Icon className="text-grey"/>
                  <h3 className="md:text-base text-sm font-playfair text-white">{box.title}</h3>
                  <p className="text-xs md:text-sm  text-white/90 pb-2">{box.description}</p>
                </div>
                )
              })
            }
          </div>
        </div>
      </section>
    </div>
  )
}

export default Features;