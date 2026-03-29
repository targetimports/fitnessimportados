import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.2";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  phone: string;
  whatsapp?: string;
  cnpj?: string;
  company?: string;
  segment?: string;
  productType?: string;
  country?: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: ContactEmailRequest = await req.json();
    
    // Validate required fields
    if (!data.name || !data.email || !data.phone || !data.message) {
      return new Response(
        JSON.stringify({ error: "Campos obrigatórios não preenchidos" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Save lead to database
    const { error: dbError } = await supabase.from("leads").insert({
      name: data.name,
      email: data.email,
      phone: data.phone,
      whatsapp: data.whatsapp || null,
      cnpj: data.cnpj || null,
      company: data.company || null,
      segment: data.segment || null,
      product_type: data.productType || null,
      country: data.country || null,
      message: data.message,
      client_type: data.company ? 'empresa' : 'pessoa_fisica',
    });

    if (dbError) {
      console.error("Error saving lead to database:", dbError);
    } else {
      console.log("Lead saved to database successfully");
    }

    // Email to the company (lead notification)
    const leadEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1a1a1a; color: #ffffff; padding: 30px; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #D4AF37; margin: 0;">Novo Lead - Target Importadora</h1>
        </div>
        
        <div style="background: #2a2a2a; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #D4AF37; margin-top: 0;">Informações de Contato</h2>
          <p><strong>Nome:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Telefone:</strong> ${data.phone}</p>
          ${data.whatsapp ? `<p><strong>WhatsApp:</strong> ${data.whatsapp}</p>` : ''}
        </div>
        
        ${data.cnpj || data.company || data.segment ? `
        <div style="background: #2a2a2a; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #D4AF37; margin-top: 0;">Informações da Empresa</h2>
          ${data.company ? `<p><strong>Empresa:</strong> ${data.company}</p>` : ''}
          ${data.cnpj ? `<p><strong>CNPJ:</strong> ${data.cnpj}</p>` : ''}
          ${data.segment ? `<p><strong>Segmento:</strong> ${data.segment}</p>` : ''}
        </div>
        ` : ''}
        
        ${data.productType || data.country ? `
        <div style="background: #2a2a2a; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #D4AF37; margin-top: 0;">Interesse de Importação</h2>
          ${data.productType ? `<p><strong>Tipo de Produto:</strong> ${data.productType}</p>` : ''}
          ${data.country ? `<p><strong>País de Origem:</strong> ${data.country}</p>` : ''}
        </div>
        ` : ''}
        
        <div style="background: #2a2a2a; padding: 20px; border-radius: 8px;">
          <h2 style="color: #D4AF37; margin-top: 0;">Mensagem</h2>
          <p style="white-space: pre-wrap;">${data.message}</p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #3a3a3a;">
          <p style="color: #888; font-size: 12px;">Este email foi enviado automaticamente pelo formulário de contato do site.</p>
        </div>
      </div>
    `;

    // Send lead notification to company
    const leadEmail = await resend.emails.send({
      from: "Target Importadora <onboarding@resend.dev>",
      to: ["contato@targetimports.com"], // Email da empresa
      subject: `Novo Lead: ${data.name} - ${data.company || 'Pessoa Física'}`,
      html: leadEmailHtml,
    });

    // Confirmation email to the client
    const confirmationEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1a1a1a; color: #ffffff; padding: 30px; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #D4AF37; margin: 0;">Target Importadora</h1>
          <p style="color: #888; margin-top: 10px;">Sua parceira em importações</p>
        </div>
        
        <div style="background: #2a2a2a; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #D4AF37; margin-top: 0;">Olá, ${data.name}!</h2>
          <p>Recebemos sua mensagem e nossa equipe entrará em contato em breve.</p>
          <p>Agradecemos pelo interesse em nossos serviços de importação!</p>
        </div>
        
        <div style="background: #2a2a2a; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #D4AF37; margin-top: 0;">Resumo do seu contato:</h3>
          <p><strong>Mensagem:</strong></p>
          <p style="white-space: pre-wrap; color: #ccc;">${data.message}</p>
        </div>
        
        <div style="text-align: center; margin-top: 30px;">
          <p>Enquanto isso, siga-nos nas redes sociais:</p>
          <a href="https://instagram.com/targetimportadora" style="color: #D4AF37; text-decoration: none;">@targetimportadora</a>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #3a3a3a;">
          <p style="color: #888; font-size: 12px;">Target Importadora - Conectando você ao mundo</p>
          <p style="color: #888; font-size: 12px;">www.targetimports.com</p>
        </div>
      </div>
    `;

    // Send confirmation to the client
    const confirmationEmail = await resend.emails.send({
      from: "Target Importadora <onboarding@resend.dev>",
      to: [data.email],
      subject: "Recebemos sua mensagem - Target Importadora",
      html: confirmationEmailHtml,
    });

    console.log("Lead email sent:", leadEmail);
    console.log("Confirmation email sent:", confirmationEmail);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Emails enviados com sucesso" 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
