import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, Users, Mail, Phone, Building2, Calendar, RefreshCw, UserPlus, Trash2, Loader2, Video, Upload, X, ShoppingBag, Plus, Edit2, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import logoTarget from '@/assets/logo-target.png';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  whatsapp: string | null;
  company: string | null;
  cnpj: string | null;
  segment: string | null;
  product_type: string | null;
  country: string | null;
  message: string;
  client_type: string | null;
  created_at: string;
}

interface AdminInvite {
  id: string;
  email: string;
  used_at: string | null;
  created_at: string;
}

interface Product {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  cost_china: number;
  price_brazil: number;
  margin_percent: number;
  category: string | null;
  is_active: boolean;
  sort_order: number;
}

const emptyProduct = {
  name: '',
  description: '',
  image_url: '',
  cost_china: 0,
  price_brazil: 0,
  category: '',
  is_active: true,
  sort_order: 0,
};

export default function Admin() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [invites, setInvites] = useState<AdminInvite[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [inviteEmail, setInviteEmail] = useState('');
  const [isLoadingLeads, setIsLoadingLeads] = useState(true);
  const [isLoadingInvites, setIsLoadingInvites] = useState(true);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [selectedLeads, setSelectedLeads] = useState<Set<string>>(new Set());
  const [isDeletingLeads, setIsDeletingLeads] = useState(false);
  const [isInviting, setIsInviting] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string | null>(null);
  const [isUploadingVideo, setIsUploadingVideo] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [isSavingProduct, setIsSavingProduct] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { user, isAdmin, isLoading, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login');
    } else if (!isLoading && user && !isAdmin) {
      toast({
        title: "Acesso negado",
        description: "Você não tem permissão para acessar esta área.",
        variant: "destructive"
      });
      navigate('/');
    }
  }, [user, isAdmin, isLoading, navigate, toast]);

  const fetchLeads = async () => {
    setIsLoadingLeads(true);
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setLeads(data || []);
    } catch (error) {
      console.error('Error fetching leads:', error);
      toast({
        title: "Erro ao carregar leads",
        description: "Não foi possível carregar os leads.",
        variant: "destructive"
      });
    } finally {
      setIsLoadingLeads(false);
    }
  };

  const fetchInvites = async () => {
    setIsLoadingInvites(true);
    try {
      const { data, error } = await supabase
        .from('admin_invites')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setInvites(data || []);
    } catch (error) {
      console.error('Error fetching invites:', error);
    } finally {
      setIsLoadingInvites(false);
    }
  };

  const fetchVideoSetting = async () => {
    try {
      const { data } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', 'institutional_video_url')
        .maybeSingle();
      setCurrentVideoUrl(data?.value || null);
    } catch (err) {
      console.error('Error fetching video setting:', err);
    }
  };

  const fetchProducts = async () => {
    setIsLoadingProducts(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('sort_order', { ascending: true });
      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoadingProducts(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchLeads();
      fetchInvites();
      fetchVideoSetting();
      fetchProducts();
    }
  }, [isAdmin]);

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const MAX_SIZE = 23 * 1024 * 1024; // 23 MB
    if (file.size > MAX_SIZE) {
      toast({
        title: "Arquivo muito grande",
        description: "O vídeo deve ter no máximo 23 MB.",
        variant: "destructive"
      });
      return;
    }

    if (!file.type.startsWith('video/')) {
      toast({
        title: "Formato inválido",
        description: "Envie um arquivo de vídeo (.mp4, .webm, etc).",
        variant: "destructive"
      });
      return;
    }

    setIsUploadingVideo(true);
    try {
      const fileName = `institutional-video-${Date.now()}.${file.name.split('.').pop()}`;

      const { error: uploadError } = await supabase.storage
        .from('videos')
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('videos')
        .getPublicUrl(fileName);

      const publicUrl = urlData.publicUrl;

      // Upsert setting
      const { error: settingsError } = await supabase
        .from('site_settings')
        .upsert({ key: 'institutional_video_url', value: publicUrl, updated_at: new Date().toISOString() }, { onConflict: 'key' });

      if (settingsError) throw settingsError;

      setCurrentVideoUrl(publicUrl);
      toast({ title: "Vídeo enviado com sucesso!", description: "O vídeo institucional foi atualizado." });
    } catch (error) {
      console.error('Error uploading video:', error);
      toast({ title: "Erro ao enviar vídeo", description: "Tente novamente.", variant: "destructive" });
    } finally {
      setIsUploadingVideo(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleRemoveVideo = async () => {
    try {
      await supabase
        .from('site_settings')
        .upsert({ key: 'institutional_video_url', value: null, updated_at: new Date().toISOString() }, { onConflict: 'key' });

      setCurrentVideoUrl(null);
      toast({ title: "Vídeo removido", description: "O vídeo do YouTube será exibido novamente." });
    } catch (error) {
      console.error('Error removing video:', error);
      toast({ title: "Erro ao remover vídeo", variant: "destructive" });
    }
  };

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;

    setIsInviting(true);
    try {
      const { error } = await supabase
        .from('admin_invites')
        .insert({ 
          email: inviteEmail.toLowerCase().trim(),
          invited_by: user?.id 
        });
      
      if (error) {
        if (error.code === '23505') {
          toast({
            title: "Email já convidado",
            description: "Este email já possui um convite pendente.",
            variant: "destructive"
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Convite enviado!",
          description: `${inviteEmail} foi convidado como admin.`
        });
        setInviteEmail('');
        fetchInvites();
      }
    } catch (error) {
      console.error('Error creating invite:', error);
      toast({
        title: "Erro ao convidar",
        description: "Não foi possível criar o convite.",
        variant: "destructive"
      });
    } finally {
      setIsInviting(false);
    }
  };

  const handleDeleteInvite = async (id: string) => {
    try {
      const { error } = await supabase
        .from('admin_invites')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      toast({ title: "Convite removido" });
      fetchInvites();
    } catch (error) {
      console.error('Error deleting invite:', error);
      toast({
        title: "Erro ao remover convite",
        variant: "destructive"
      });
    }
  };

  const handleSaveProduct = async () => {
    if (!editingProduct?.name) return;
    setIsSavingProduct(true);
    try {
      if (editingProduct.id) {
        const { id, margin_percent, ...updateData } = editingProduct as Product;
        const { error } = await supabase.from('products').update(updateData).eq('id', id);
        if (error) throw error;
        toast({ title: "Produto atualizado!" });
      } else {
        const { error } = await supabase.from('products').insert(editingProduct as any);
        if (error) throw error;
        toast({ title: "Produto criado!" });
      }
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      toast({ title: "Erro ao salvar produto", variant: "destructive" });
    } finally {
      setIsSavingProduct(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
      toast({ title: "Produto removido" });
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({ title: "Erro ao remover", variant: "destructive" });
    }
  };

  const handleToggleActive = async (id: string, isActive: boolean) => {
    try {
      const { error } = await supabase.from('products').update({ is_active: isActive }).eq('id', id);
      if (error) throw error;
      fetchProducts();
    } catch (error) {
      console.error('Error toggling product:', error);
    }
  };

  const toggleLeadSelection = (id: string) => {
    setSelectedLeads(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const toggleAllLeads = () => {
    if (selectedLeads.size === leads.length) {
      setSelectedLeads(new Set());
    } else {
      setSelectedLeads(new Set(leads.map(l => l.id)));
    }
  };

  const handleDeleteSelectedLeads = async () => {
    if (selectedLeads.size === 0) return;
    const confirmed = window.confirm(`Tem certeza que deseja excluir ${selectedLeads.size} lead(s)?`);
    if (!confirmed) return;

    setIsDeletingLeads(true);
    try {
      const { error } = await supabase
        .from('leads')
        .delete()
        .in('id', Array.from(selectedLeads));
      if (error) throw error;
      toast({ title: `${selectedLeads.size} lead(s) excluído(s)` });
      setSelectedLeads(new Set());
      fetchLeads();
    } catch (error) {
      console.error('Error deleting leads:', error);
      toast({ title: "Erro ao excluir leads", variant: "destructive" });
    } finally {
      setIsDeletingLeads(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gold" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={logoTarget} alt="Target Importadora" className="h-10" />
            <span className="text-lg font-semibold">Painel Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block">{user?.email}</span>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="leads" className="space-y-6">
          <TabsList>
            <TabsTrigger value="leads" className="gap-2">
              <Users className="h-4 w-4" />
              Leads ({leads.length})
            </TabsTrigger>
            <TabsTrigger value="products" className="gap-2">
              <ShoppingBag className="h-4 w-4" />
              Produtos ({products.length})
            </TabsTrigger>
            <TabsTrigger value="invites" className="gap-2">
              <UserPlus className="h-4 w-4" />
              Convites
            </TabsTrigger>
            <TabsTrigger value="video" className="gap-2">
              <Video className="h-4 w-4" />
              Vídeo
            </TabsTrigger>
          </TabsList>

          <TabsContent value="leads" className="space-y-4">
            <div className="flex justify-between items-center flex-wrap gap-3">
              <h2 className="text-2xl font-bold">Leads Recebidos</h2>
              <div className="flex gap-2">
                {selectedLeads.size > 0 && (
                  <Button variant="destructive" onClick={handleDeleteSelectedLeads} disabled={isDeletingLeads}>
                    {isDeletingLeads ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Trash2 className="h-4 w-4 mr-2" />}
                    Excluir ({selectedLeads.size})
                  </Button>
                )}
                <Button variant="outline" onClick={fetchLeads} disabled={isLoadingLeads}>
                  <RefreshCw className={`h-4 w-4 mr-2 ${isLoadingLeads ? 'animate-spin' : ''}`} />
                  Atualizar
                </Button>
              </div>
            </div>

            {isLoadingLeads ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-gold" />
              </div>
            ) : leads.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Nenhum lead recebido ainda.</p>
              </div>
            ) : (
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-10">
                          <input
                            type="checkbox"
                            checked={selectedLeads.size === leads.length && leads.length > 0}
                            onChange={toggleAllLeads}
                            className="rounded border-border"
                          />
                        </TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Nome</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Telefone</TableHead>
                        <TableHead>Empresa</TableHead>
                        <TableHead>Mensagem</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {leads.map((lead) => (
                        <TableRow key={lead.id} className={selectedLeads.has(lead.id) ? 'bg-gold/5' : ''}>
                          <TableCell>
                            <input
                              type="checkbox"
                              checked={selectedLeads.has(lead.id)}
                              onChange={() => toggleLeadSelection(lead.id)}
                              className="rounded border-border"
                            />
                          </TableCell>
                          <TableCell className="whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              {formatDate(lead.created_at)}
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{lead.name}</TableCell>
                          <TableCell>
                            <a href={`mailto:${lead.email}`} className="flex items-center gap-2 text-gold hover:underline">
                              <Mail className="h-4 w-4" />
                              {lead.email}
                            </a>
                          </TableCell>
                          <TableCell>
                            <a href={`tel:${lead.phone}`} className="flex items-center gap-2 hover:text-gold">
                              <Phone className="h-4 w-4" />
                              {lead.phone}
                            </a>
                          </TableCell>
                          <TableCell>
                            {lead.company ? (
                              <div className="flex items-center gap-2">
                                <Building2 className="h-4 w-4 text-muted-foreground" />
                                {lead.company}
                              </div>
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </TableCell>
                          <TableCell className="max-w-xs truncate" title={lead.message}>
                            {lead.message}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="invites" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Convidar Admin</h2>
              <p className="text-muted-foreground">
                Convide outros usuários para terem acesso ao painel administrativo.
              </p>
            </div>

            <form onSubmit={handleInvite} className="flex gap-4 max-w-md">
              <Input
                type="email"
                placeholder="email@exemplo.com"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                required
              />
              <Button type="submit" variant="gold" disabled={isInviting}>
                {isInviting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Convidar
                  </>
                )}
              </Button>
            </form>

            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Data do Convite</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoadingInvites ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8">
                        <Loader2 className="h-6 w-6 animate-spin mx-auto text-gold" />
                      </TableCell>
                    </TableRow>
                  ) : invites.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                        Nenhum convite enviado.
                      </TableCell>
                    </TableRow>
                  ) : (
                    invites.map((invite) => (
                      <TableRow key={invite.id}>
                        <TableCell className="font-medium">{invite.email}</TableCell>
                        <TableCell>
                          {invite.used_at ? (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/20 text-primary">
                              Aceito
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gold/20 text-gold">
                              Pendente
                            </span>
                          )}
                        </TableCell>
                        <TableCell>{formatDate(invite.created_at)}</TableCell>
                        <TableCell>
                          {!invite.used_at && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteInvite(invite.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Produtos</h2>
              <div className="flex gap-2">
                <Button variant="outline" onClick={fetchProducts} disabled={isLoadingProducts}>
                  <RefreshCw className={`h-4 w-4 mr-2 ${isLoadingProducts ? 'animate-spin' : ''}`} />
                  Atualizar
                </Button>
                <Button variant="gold" onClick={() => setEditingProduct({ ...emptyProduct })}>
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Produto
                </Button>
              </div>
            </div>

            {/* Product Edit Form */}
            {editingProduct && (
              <div className="bg-card border border-gold/30 rounded-lg p-6 space-y-4">
                <h3 className="text-lg font-bold">{editingProduct.id ? 'Editar Produto' : 'Novo Produto'}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input placeholder="Nome do produto *" value={editingProduct.name || ''} onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })} />
                  <Input placeholder="Categoria" value={editingProduct.category || ''} onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })} />
                  <Input placeholder="URL da imagem" value={editingProduct.image_url || ''} onChange={(e) => setEditingProduct({ ...editingProduct, image_url: e.target.value })} />
                  <Input type="number" placeholder="Ordem" value={editingProduct.sort_order || 0} onChange={(e) => setEditingProduct({ ...editingProduct, sort_order: Number(e.target.value) })} />
                  <Input type="number" placeholder="Custo China (R$)" value={editingProduct.cost_china || ''} onChange={(e) => setEditingProduct({ ...editingProduct, cost_china: Number(e.target.value) })} />
                  <Input type="number" placeholder="Preço Brasil (R$)" value={editingProduct.price_brazil || ''} onChange={(e) => setEditingProduct({ ...editingProduct, price_brazil: Number(e.target.value) })} />
                </div>
                <Textarea placeholder="Descrição" value={editingProduct.description || ''} onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })} />
                <div className="flex gap-3">
                  <Button variant="gold" onClick={handleSaveProduct} disabled={isSavingProduct}>
                    {isSavingProduct ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                    Salvar
                  </Button>
                  <Button variant="outline" onClick={() => setEditingProduct(null)}>Cancelar</Button>
                </div>
              </div>
            )}

            {isLoadingProducts ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-gold" />
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <ShoppingBag className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Nenhum produto cadastrado.</p>
              </div>
            ) : (
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Produto</TableHead>
                        <TableHead>Categoria</TableHead>
                        <TableHead>Custo China</TableHead>
                        <TableHead>Preço Brasil</TableHead>
                        <TableHead>Margem</TableHead>
                        <TableHead>Ativo</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>{product.category || '-'}</TableCell>
                          <TableCell>R$ {product.cost_china.toFixed(2)}</TableCell>
                          <TableCell>R$ {product.price_brazil.toFixed(2)}</TableCell>
                          <TableCell className="text-gold font-bold">{product.margin_percent}%</TableCell>
                          <TableCell>
                            <Switch checked={product.is_active} onCheckedChange={(v) => handleToggleActive(product.id, v)} />
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm" onClick={() => setEditingProduct(product)}>
                                <Edit2 className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-destructive" onClick={() => handleDeleteProduct(product.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="video" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Vídeo Institucional</h2>
              <p className="text-muted-foreground">
                Envie um vídeo .mp4 de até 23 MB para substituir o vídeo do YouTube.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 max-w-2xl space-y-6">
              {currentVideoUrl ? (
                <div className="space-y-4">
                  <video
                    src={currentVideoUrl}
                    controls
                    className="w-full aspect-video rounded-lg bg-black"
                  />
                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => fileInputRef.current?.click()} disabled={isUploadingVideo}>
                      <Upload className="h-4 w-4 mr-2" />
                      Trocar Vídeo
                    </Button>
                    <Button variant="destructive" onClick={handleRemoveVideo}>
                      <X className="h-4 w-4 mr-2" />
                      Remover (voltar ao YouTube)
                    </Button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-border rounded-lg p-12 text-center cursor-pointer hover:border-gold/50 transition-colors"
                >
                  {isUploadingVideo ? (
                    <Loader2 className="h-12 w-12 animate-spin mx-auto text-gold mb-4" />
                  ) : (
                    <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  )}
                  <p className="text-lg font-medium mb-1">
                    {isUploadingVideo ? 'Enviando...' : 'Clique para enviar o vídeo'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    MP4, WebM — máximo 23 MB
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Atualmente exibindo o vídeo do YouTube
                  </p>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                className="hidden"
                onChange={handleVideoUpload}
              />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
