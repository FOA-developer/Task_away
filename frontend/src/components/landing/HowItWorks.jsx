import { Sun, Mail, Layers } from 'lucide-react';

const cards = [
  { header: "Sign In & Create Your Space",
    body: "Log in and create your personal workspace in seconds. Your sanctuary for focused work.",
    icon : Sun
  },
  {
    header: "Invite Your Team",
    body: "Invite teammates via email. Each member gets their own role and personalized view.",
    icon : Mail
  },
  {
    header: "Work Across Workspaces",
    body: "Belong to multiple workspaces simultaneously. Toggle between them from your unified dashboard.",
    icon : Layers
  }
]

const HowItWorks = () => {
  return ( 
    <div className="plain-background text-primary">
      <section className="relative z-10" id="howitworks">
        <div className="flex flex-col justify-between items-center">
          <h2 className="text-5xl font-playfair font-semibold">Built for the way you actually work</h2>
          <div className="w-15 h-1 bg-mellow rounded-xl mt-5"></div>
          <div className="grid grid-cols-3 py-8 px-10 mt-15 gap-6">
            {cards.map((card) =>{
              const Icon = card.icon
               return <div className="flex flex-col min-w-[290px] p-4 bg-mellow rounded-xl border-1 border-grey" key={card.header}> 
                        <div className="pt-6">
                          <Icon className="" size={32}></Icon>
                        </div>
                        <h3 className="font-playfair pt-3 text-lg font-semibold pr-2">{card.header}</h3>
                        <p className="pt-3 text-sm pb-4">{card.body}</p>
                      </div>
            })}
          </div>
        </div>
      </section>
    </div>
   );
}
 
export default HowItWorks;