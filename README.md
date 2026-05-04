mermaid

graph TD
    %% İstemci Katmanı
    subgraph Clients [İstemci Katmanı]
        C1[Şirket A - API Key: AAA]
        C2[Şirket B - API Key: BBB]
        C3[Şirket C - API Key: CCC]
    end

    %% Giriş ve Güvenlik
    subgraph Gateway [Yönetim ve Güvenlik Katmanı]
        Proxy[Nginx / Reverse Proxy]
        Router[LiteLLM Proxy / API Gateway]
        Auth[Auth & Kullanım Takibi]
    end

    %% Cluster (Süper Bilgisayar) Katmanı
    subgraph Cluster [AI Cluster - 256GB Unified Memory]
        direction TB
        
        subgraph Interconnect [NVLink / 200GbE RDMA]
            Link{High-Speed Interconnect}
        end

        subgraph Node1 [NVIDIA DGX Spark - 128GB]
            vGPU_A1[MIG Instance 1 - 40GB]
            vGPU_A2[MIG Instance 2 - 40GB]
        end

        subgraph Node2 [Asus Ascent GX10 - 128GB]
            vGPU_B1[MIG Instance 3 - 40GB]
            vGPU_B2[LoRA Exchange Manager]
        end
    end

    %% Veri ve İzolasyon
    subgraph DataIsolation [Veri İzolasyon Katmanı]
        VDB_A[(Vektör DB - Şirket A)]
        VDB_B[(Vektör DB - Şirket B)]
        VDB_C[(Vektör DB - Şirket C)]
    end

    %% Akış Çizgileri
    C1 --> Proxy
    C2 --> Proxy
    C3 --> Proxy
    
    Proxy --> Router
    Router --> Auth
    
    Auth -- "Şirket A'ya yönlendir" --> vGPU_A1
    Auth -- "Şirket B'ya yönlendir" --> vGPU_A2
    Auth -- "Şirket C'ye yönlendir" --> vGPU_B1

    vGPU_A1 <--> VDB_A
    vGPU_A2 <--> VDB_B
    vGPU_B1 <--> VDB_C

    %% Cluster Bağlantısı
    Node1 <==> Link <==> Node2
mermaid
